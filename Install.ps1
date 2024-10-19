<#
.SYNOPSIS
Applies a privacy and security configuration baseline to Mozilla Firefox.

.DESCRIPTION
Applies a privacy and security configuration baseline to Mozilla Firefox. This is
achieved by 
* adding a custom user.js with preferences to the default profile
* adding a custom polices.json file that installs uBlock Origin
* adding settings for uBlock Origin by changing the Windows Registry

Use optional arguments if needed:
-ProfilePath    Optionally supply the Firefox profile to use manually
-FirefoxPath    Optionally supply the Firefox installation path manually
-BackupPath     Optionally supply where the profiles backup is stored
-SkipBackup     Use this option to skip backing up user profiles before installing

REQUIREMENTS:

* PowerShell execution policy must be configured to allow script execution; for example,
  with a command such as the following:
  Set-ExecutionPolicy RemoteSigned

* The script must be run with administrative privileges

.PARAMETER ProfilePath
Specify where the current Firefox profile is stored. Go to "about:profiles" in Firefox
and supply the Root Directory of the Default Profile

.PARAMETER FirefoxPath
Specify where Firefox is installed. Provide the folder where firefox.exe is found

.PARAMETER BackupPath
Specify where Firefox profiles are backed up. Default is C:\tmp\Backup_Firefox_Profiles

.PARAMETER SkipBackup
Skip backing up the current Firefox profiles

#>

[CmdletBinding()]
param (
	[string]$ProfilePath = "",
    [string]$FirefoxPath = "",
    [string]$BackupPath = "C:\tmp\Backup_Firefox_Profiles",
    [switch]$SkipBackup
)

$firefoxProfilesFolder = "$env:APPDATA\Mozilla\Firefox\Profiles"

function Warn([string]$Msg){
    $Resp = $Host.UI.PromptForChoice("Warning",$Msg,@("&Yes","&No"),1)
    if ($Resp -eq 1){
        Write-Host "Script aborted."
        exit 1
    } 
}

function Error([string]$Msg){
    Write-Host -ForegroundColor Red "ERROR: $Msg"
    exit 1
}

function Find-FirefoxInstallation {
    $possiblePaths = @(
        "$env:ProgramFiles\Mozilla Firefox\firefox.exe",
        "$env:ProgramFiles (x86)\Mozilla Firefox\firefox.exe",
        "$env:LocalAppData\Mozilla Firefox\firefox.exe"
    )
	$foundPaths = @()
    
    foreach ($path in $possiblePaths) {
        if (Test-Path $path) {
            $foundPaths += $path
        }
    }

    if ($foundPaths.Count -eq 1) {
        $FirefoxInstallation = $foundPaths -replace "firefox\.exe",""
        Write-Host "Found Firefox installation at $FirefoxInstallation"
        return $FirefoxInstallation
    } else {
        Error "Could not find valid Firefox installation.
        Please re-run the script with a '-FirefoxPath' argument"
    }
}

function Find-FirefoxProfile {
    $ActiveProfiles = @()
    $Profiles = Get-ChildItem -Path $firefoxProfilesFolder

    foreach ($folder in $Profiles){
        if (Test-Path "$firefoxProfilesFolder\$folder\places.sqlite") {
            $ActiveProfiles += $folder
        }
    }

    if ($ActiveProfiles.Count -eq 1) {
        Write-Host "Using profile $ActiveProfiles"
        return "$firefoxProfilesFolder\$ActiveProfiles"
    } else {
        Error "Could not find valid Firefox profile. 
        Please re-run the script with a '-ProfilePath' argument"
    }
}

function Backup-FirefoxProfiles {
	$DateString = (Get-Date).ToString("yyyyMMddHHmmss")
    $FullBackupPath = "$BackupPath\Firefox-$DateString"
	
	if (-not (Test-Path $BackupPath)) {
		New-Item -ItemType Directory -Path $BackupPath -Force | Out-Null
	}
	try {
        Write-Host "Backing up Firefox profiles from $firefoxProfilesFolder..."
		Copy-Item -Path $firefoxProfilesFolder -Destination $FullBackupPath -Recurse -Force -ErrorAction Stop
        Write-Host "Backup completed sucessfully. See $FullBackupPath"
	} catch [System.IO.IOException] {
        Remove-Item -Path $FullBackupPath -Recurse -Force
		Error "Close Firefox before running this script"
	} 
}

$IsAdmin = [bool](([System.Security.Principal.WindowsIdentity]::GetCurrent()).groups -match "S-1-5-32-544")
if (-not $IsAdmin){
    Error "Script is not running with administrative privileges. Failed to apply policies"
}

if (-not $FirefoxPath){
    $FirefoxPath = Find-FirefoxInstallation
} elseif (-not (Test-Path "$FirefoxPath\firefox.exe")){
    Error "Could not find Firefox installation at $FirefoxPath
    Please re-run the script with a valid '-FirefoxPath' argument"
}

if (-not $ProfilePath){
    $ProfilePath = Find-FirefoxProfile
} elseif (-not (Test-Path $ProfilePath)){
    Error "Could not find Profile path $ProfilePath
    Please re-run the script with a valid '-ProfilePath' argument"
}

if (-not $SkipBackup){
    Backup-FirefoxProfiles
}

if (Test-Path "$ProfilePath\user.js"){
    Warn "A user.js file already exists. Overwrite?"
}

if (Test-Path "$FirefoxPath\distribution\policies.json"){
    Warn "A policy.json file already exists. Overwrite?"
}

# Copy user.js and policies.json to
$rootDir = [System.IO.Path]::GetDirectoryName($MyInvocation.MyCommand.Path)
Copy-Item -Path "$rootDir\user.js" -Destination "$ProfilePath\user.js" -Force
if (-not (Test-Path "$FirefoxPath\distribution")){
    New-Item -ItemType Directory -Path "$FirefoxPath\distribution" | Out-Null
}
Copy-Item -Path "$rootDir\policies.json" -Destination "$FirefoxPath\distribution\policies.json" -Force

# Write uBlock Origin configuration to Windows registry
$Key = "HKLM:\SOFTWARE\Policies\Mozilla\Firefox\3rdparty\Extensions\uBlock0@raymondhill.net"
$RawValue = Get-Content -Path "$rootDir\ublock.json"
$Value = [string[]]$RawValue -join "" -replace "\s","" #Removes newlines and whitespace
if (-Not (Test-Path -Path $Key)) {
    New-Item -Path $Key -Force | Out-Null
}
$RegistryPath = Get-ItemProperty -Path $Key
if ($RegistryPath.PSObject.Properties.Name -contains "toOverwrite") {
    Warn "A uBlock0@raymondhill.net toOverwrite registry item already exists. Overwrite?"
}
New-ItemProperty -Path $Key -Name "toOverwrite" -PropertyType MultiString -Value $Value -Force | Out-Null

Write-Host "Done. Restart Firefox to apply settings"
