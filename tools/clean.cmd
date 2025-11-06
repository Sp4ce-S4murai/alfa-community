@echo off
cd /d "%~dp0\.."
IF EXIST node_modules rmdir /S /Q node_modules
IF EXIST .astro rmdir /S /Q .astro
IF EXIST package-lock.json del /F /Q package-lock.json