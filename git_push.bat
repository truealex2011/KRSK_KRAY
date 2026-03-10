@echo off
setlocal enabledelayedexpansion

set GIT="C:\Users\alex7\OneDrive\Рабочий стол\IT-Куб\Прочее\PortableGit\bin\git.exe"

echo Committing changes...
%GIT% commit -m "Dark theme forced, images fixed, project ready"

echo Pulling from remote...
%GIT% pull origin main

echo Pushing to GitHub...
%GIT% push origin main

echo.
echo Done! Project pushed to GitHub
