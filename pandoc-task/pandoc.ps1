Trace-VstsEnteringInvocation $MyInvocation

function Get-FormatExtension
{
	param( [string]$formatName )

	switch ($formatName)
	{
		{($_ -contains "mark")} { ".md"}
		"textile" { ".textile" }
		"rst" { ".rst" }
		"html" { ".html" }
		"docbook" { ".db" }
		"docx" { ".docx" }
		"odt" { ".odt" }
		"epub" { ".epub" }
		"opml" { ".opml" }
		"org" { ".org" }
		"man" { ".1" }
		"mediawiki" { ".wiki" }
		"latex" { ".tex" }
		default { ".txt" }
	}
}

function Run-Pandoc
{
	param(
		[string[]]$defaultArgs,
		[string]$oldFile,
		[string]$newFile
	)

	$argsList = "$($defaultArgs -join ' ') $oldFile -o $newFile"
	Write-Host "Converting $oldFile"

	$pd = New-Object System.Diagnostics.Process
	$pd.StartInfo.FileName = "pandoc.exe"
	$pd.StartInfo.Arguments = $argsList
	$pd.StartInfo.RedirectStandardOutput = $true
	$pd.StartInfo.RedirectStandardError = $true
	$pd.StartInfo.UseShellExecute = $false
	$pd.Start()

	if (!$pd.WaitForExit(10000)){
		$pd.Kill()
	}

	Write-Host $pd.StandardOutput.ReadToEnd()
	$errOut = $pd.StandardError.ReadToEnd()

	# If error out actually contains errors then we want error, otherwise stdout is fine.
	if ($errOut -ne "" -and $errOut -contains "rror"){
		Write-Error $errOut
		Write-Error "Arguments: $argsList"
	} elseif ($errOut -ne "") {
		Write-Host $errout
	}
}

try {

	[string]$sourceFolder = Get-VstsInput -Name sourceFolder -Require
	[string]$targets = Get-VstsInput -Name targetfiles -Require
	[string]$inputFormat = Get-VstsInput -Name inputFormat -Require
	[string]$outputFormat = Get-VstsInput -Name outputFormat -Require
	[string]$commandLineOptions = Get-VstsInput -Name commandLineOptions
	[bool]$standalone = Get-VstsInput -Name standalone -AsBool

	[string[]]$fileList = Find-VstsMatch -DefaultRoot $sourceFolder -Pattern $targets

	Write-Host "Converting $($fileList.Length) files from $inputFormat to $outputFormat."

	$argList = @(
		"--from=$inputFormat",
		"--to=$outputFormat",
		$commandLineOptions
	)

	if ($standalone){
		$argList += "--standalone"
	}

	$newExtension = Get-FormatExtension -formatName $outputFormat

	ForEach ($fileName in $fileList) {
		$newFile = [io.path]::ChangeExtension($fileName, $newExtension)
		Run-Pandoc -defaultArgs $argList -oldFile $fileName -newFile $newFile
	}

} catch{
	Write-Host "##vso[task.logissue type=error;]$_"
	Write-Host "##vso[task.complete result=Failed;]$_"
} finally {
	Trace-VstsLeavingInvocation $MyInvocation
}