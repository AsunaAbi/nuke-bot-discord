@echo off
title Presser Beta

if exist node_modules\ (
@echo off
title fliegender nuker
echo Please wait...
node index.js
pause
  
) else (
  call npm i >> NUL
  echo Alle wichtigen Sachen wurden erfolgreich installiert!
@echo off
title fliegender nuker
echo Please wait...
node index.js
pause
)
