$pluginsDir = "D:\sylvaventis\scripts\plugins"

function Fix-PluginZip($zipName, $innerFolderName, $cleanFolderName) {
    $zipPath = "$pluginsDir\$zipName"
    $tempDir = "$pluginsDir\temp_$cleanFolderName"
    
    if (Test-Path $zipPath) {
        Write-Host "Naprawianie $zipName..."
        if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
        
        Expand-Archive -Path $zipPath -DestinationPath $tempDir -Force
        
        $targetFolder = "$tempDir\$innerFolderName"
        $renamedFolder = "$tempDir\$cleanFolderName"
        
        if (Test-Path $targetFolder) {
            Rename-Item -Path $targetFolder -NewName $cleanFolderName
        }
        
        Remove-Item $zipPath -Force
        Compress-Archive -Path $renamedFolder -DestinationPath $zipPath -Force
        Remove-Item $tempDir -Recurse -Force
        Write-Host "[OK] Gotowy czysty plik ZIP: $zipPath"
    }
}

Fix-PluginZip "wp-graphql-smart-cache.zip" "wp-graphql-smart-cache-main" "wp-graphql-smart-cache"
Fix-PluginZip "wp-graphql-yoast-seo.zip" "wp-graphql-yoast-seo-master" "wp-graphql-yoast-seo"
Fix-PluginZip "wp-graphql-headless-login.zip" "wp-graphql-headless-login-main" "wp-graphql-headless-login"
