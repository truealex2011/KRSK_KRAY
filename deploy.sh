#!/bin/bash

# Git push script for KRSK_KRAY project

GIT_PATH="/c/Users/alex7/OneDrive/Рабочий стол/IT-Куб/Прочее/PortableGit/bin/git.exe"

echo "Adding files..."
$GIT_PATH add .

echo "Committing changes..."
$GIT_PATH commit -m "Dark theme forced, images fixed, project ready for GitHub"

echo "Pushing to GitHub..."
$GIT_PATH push origin main

echo "Done! Project pushed to GitHub"
