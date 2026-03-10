@echo off
setlocal enabledelayedexpansion

set GIT_PATH=C:\Users\alex7\OneDrive\Рабочий стол\IT-Куб\Прочее\PortableGit\bin\git.exe

"%GIT_PATH%" add .
"%GIT_PATH%" commit -m "Dark theme forced, images fixed, project ready"
"%GIT_PATH%" push origin main

echo.
echo Done! Project pushed to GitHub
pause
