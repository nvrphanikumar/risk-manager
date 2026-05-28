// Risk Manager Dashboard - Application Logic

// Default portfolio data to load if CSV fetch fails (from Positions - Portfolio.csv)
const DEFAULT_CSV_DATA = `Account,Symbol,# of Shares, ActualEntryPrice , ActualOpenDate , Actual$Change , Share Price ,Actual%Change,Actual ROI/Day,$ Change,Today,ROI/Day,Risk:Reward,Risk,%Position,Current Size,1% Position Size,1% StopLoss,Trailing Stop Loss, Entry Price ,20% Profit 2-R,Portfolio,Week1Change,Week2Change,Week3Change,Week4Change,Week5Change,Ideal Shares,Position Ideal,As of Date Price,Sector,Month End %,Week1 %,Week2,Week3,Week4,Week5,Week1$,Week2$,Week3$,Week4$,Week5$,Beta, Stop Loss , Risk/Trade 
VZ,APLX,30, $ 83.55 ,1/7/2026," $ (1,500.00)", $ 33.55 ,-59.84%,-10.87, $ 344.10 ,-9.00%,-11.10,7.42,46.37,0.25%," $ 1,006.50 "," $ 4,073.85 ",-102.25, $ 31.20 , $ 22.08 , $ 26.50 ,407385,-57.6,286.8,172.8,-389.4,331.5,1735,1.73%,#N/A,Semis,70.63%,-8.70%,47.42%,19.38%,-36.58%,49.11%, $ 22.08 , $ 20.16 , $ 29.72 , $ 35.48 , $ 22.50 ,N/A,7%,1%
VZ,ASTX,10, $ 80.00 ,1/21/2026, $ (773.90), $ 2.61 ,-96.74%,-6.24,#N/A,-0.39%,#N/A,#N/A,#N/A,0.01%, $ 26.10 ," $ 4,073.85 ",-404.78, $ 2.43 ,#N/A,#N/A,407385,#N/A,#N/A,#N/A,#N/A,#N/A,22298,0.04%,7.9,Semis,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A, $ 2.90 ,#N/A,N/A,7%,1%
VZ,ASTX,150, $ 69.90 ,10/20/2025," $ (10,093.50)", $ 2.61 ,-96.27%,-46.51,#N/A,-0.39%,#N/A,#N/A,#N/A,0.10%, $ 391.50 ," $ 4,073.85 ",-24.55, $ 2.43 ,#N/A,#N/A,407385,#N/A,#N/A,#N/A,#N/A,#N/A,22298,0.67%,7.9,Space,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A, $ 2.90 ,#N/A,N/A,7%,1%
VZ,ASTX,50, $ 60.05 ,1/7/2026," $ (2,872.00)", $ 2.61 ,-95.65%,-20.81,#N/A,-0.39%,#N/A,#N/A,#N/A,0.03%, $ 130.50 ," $ 4,073.85 ",-78.87, $ 2.43 ,#N/A,#N/A,407385,#N/A,#N/A,#N/A,#N/A,#N/A,22298,0.22%,7.9,Semis,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A, $ 2.90 ,#N/A,N/A,7%,1%
VZ,ASTX,50, $ 89.31 ,1/23/2026," $ (4,335.00)", $ 2.61 ,-97.08%,-35.53,#N/A,-0.39%,#N/A,#N/A,#N/A,0.03%, $ 130.50 ," $ 4,073.85 ",-78.87, $ 2.43 ,#N/A,#N/A,407385,#N/A,#N/A,#N/A,#N/A,#N/A,22298,0.22%,7.9,Semis,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A,#N/A, $ 2.90 ,#N/A,N/A,7%,1%
VZ,BEX,300, $ 47.53 ,3/25/2026," $ (14,238.00)", $ 0.07 ,-99.85%,-233.41, $ -   ,0.00%,0.00,0.00,1.47,0.01%, $ 21.00 ," $ 4,073.85 ",-13.51, $ 0.07 , $ 0.07 , $ 0.08 ,407385,0,0,3,-3,0,831398,0.04%,0.06,Energy,1.79%,0.00%,0.00%,14.29%,-12.50%,0.00%, $ 0.07 , $ 0.07 , $ 0.07 , $ 0.08 , $ 0.07 ,2.62,7%,1%
VZ,BEX,100, $ 47.53 ,4/17/2026," $ (4,746.00)", $ 0.07 ,-99.85%,-124.89, $ -   ,0.00%,0.00,0.00,0.49,0.00%, $ 7.00 ," $ 4,073.85 ",-40.67, $ 0.07 , $ 0.07 , $ 0.08 ,407385,0,0,1,-1,0,831398,0.01%,0.06,Energy,1.79%,0.00%,0.00%,14.29%,-12.50%,0.00%, $ 0.07 , $ 0.07 , $ 0.07 , $ 0.08 , $ 0.07 ,2.62,7%,1%
VZ,BEX,100,45.84,04/24/2026," $ (4,577.00)", $ 0.07 ,-99.85%,-147.65, $ -   ,0.00%,0.00,0.00,0.49,0.00%, $ 7.00 ," $ 4,073.85 ",-40.67, $ 0.07 , $ 0.07 , $ 0.08 ,407385,0,0,1,-1,0,831398,0.01%,0.06,Energy,1.79%,0.00%,0.00%,14.29%,-12.50%,0.00%, $ 0.07 , $ 0.07 , $ 0.07 , $ 0.08 , $ 0.07 ,2.62,7%,1%
VZ,BEX,200,41.52,04/21/2026," $ (8,290.00)", $ 0.07 ,-99.83%,-243.82, $ -   ,0.00%,0.00,0.00,0.98,0.00%, $ 14.00 ," $ 4,073.85 ",-20.30, $ 0.07 , $ 0.07 , $ 0.08 ,407385,0,0,2,-2,0,831398,0.02%,0.06,Energy,1.79%,0.00%,0.00%,14.29%,-12.50%,0.00%, $ 0.07 , $ 0.07 , $ 0.07 , $ 0.08 , $ 0.07 ,2.62,7%,1%
VZ,BEX,100,63.6,05/01/2026," $ (6,353.00)", $ 0.07 ,-99.89%,-264.71," $ (6,353.00)",0.00%,204.94,-14.27,445.20,0.00%, $ 7.00 ," $ 4,073.85 ",-40.67, $ 0.07 , $ 63.60 , $ 76.32 ,407385,-6353,0,1,-1,0,831398,0.01%,0.06,Energy,-98.10%,-99.89%,0.00%,14.29%,-12.50%,0.00%, $ 63.60 , $ 0.07 , $ 0.07 , $ 0.08 , $ 0.07 ,2.62,7%,1%
VZ,BEX,100,45.84,04/24/2026," $ (4,577.00)", $ 0.07 ,-99.85%,-147.65, $ -   ,0.00%,0.00,0.00,0.49,0.00%, $ 7.00 ," $ 4,073.85 ",-40.67, $ 0.07 , $ 0.07 , $ 0.08 ,407385,0,0,1,-1,0,831398,0.01%,0.06,Energy,1.79%,0.00%,0.00%,14.29%,-12.50%,0.00%, $ 0.07 , $ 0.07 , $ 0.07 , $ 0.08 , $ 0.07 ,2.62,7%,1%
VZ,BEX,200,41.52,04/21/2026," $ (8,290.00)", $ 0.07 ,-99.83%,-243.82, $ -   ,0.00%,0.00,0.00,0.98,0.00%, $ 14.00 ," $ 4,073.85 ",-20.30, $ 0.07 , $ 0.07 , $ 0.08 ,407385,0,0,2,-2,0,831398,0.02%,0.06,Energy,1.79%,0.00%,0.00%,14.29%,-12.50%,0.00%, $ 0.07 , $ 0.07 , $ 0.07 , $ 0.08 , $ 0.07 ,2.62,7%,1%
BackDoor,DLLL,110,$38.27,10/24/2025," $ 7,284.20 ", $ 104.49 ,173.03%,34.20," $ 4,947.80 ",32.63%,-159.61,10.80,458.23,11.08%," $ 6,546.10 ", $ 590.66 ,54.14, $ 97.18 , $ 59.51 , $ 71.41 ,59066,-363,1134.1,775.5,-580.8,3982,81,136.22%,28.58,Energy,69.23%,-5.55%,18.34%,10.60%,-7.18%,53.01%, $ 59.51 , $ 56.21 , $ 66.52 , $ 73.57 , $ 68.29 ,N/A,7%,1%
BackDoor,NEBX,76,$71.12,4/17/2026," $ 3,532.48 ", $ 117.60 ,65.35%,92.96," $ 4,209.64 ",-5.61%,-135.79,12.72,330.96,8.00%," $ 4,727.96 ", $ 590.66 ,54.44, $ 109.37 , $ 62.21 , $ 74.65 ,59066,378.48,1943.32,1654.52,-914.28,1147.6,72,105.92%,#N/A,Energy,73.76%,8.01%,38.06%,23.47%,-10.50%,14.73%, $ 62.21 , $ 67.19 , $ 92.76 , $ 114.53 , $ 102.50 ,N/A,7%,1%
BackDoor,SNDK,12,$198.52,10/30/2025," $ 15,361.92 "," $ 1,478.68 ",644.85%,74.21," $ 5,865.36 ",-4.12%,-189.21,7.05,831.52,20.11%," $ 11,878.80 ", $ 590.66 ,940.68," $ 1,375.17 ", $ 989.90 ," $ 1,187.88 ",59066,2365.2,1835.52,1287.24,-767.28,1144.68,6,210.29%,42.92,Energy,43.28%,19.91%,12.89%,8.01%,-4.42%,6.90%, $ 989.90 ," $ 1,187.00 "," $ 1,339.96 "," $ 1,447.23 "," $ 1,383.29 ,N/A,7%,1%
BackDoor,SNDK,12,$237.78,12/31/2025," $ 14,890.80 "," $ 1,478.68 ",521.87%,102.70," $ 5,865.36 ",-4.12%,-189.21,7.05,831.52,20.11%," $ 11,878.80 ", $ 590.66 ,940.68," $ 1,375.17 ", $ 989.90 ," $ 1,187.88 ",59066,2365.2,1835.52,1287.24,-767.28,1144.68,6,210.29%,42.92,Battery,43.28%,19.91%,12.89%,8.01%,-4.42%,6.90%, $ 989.90 , $ 1,187.00 , $ 1,339.96 , $ 1,447.23 , $ 1,383.29 ,N/A,7%,1%
BackDoor,SNDK,5,$619.36,3/2/2026," $ 4,296.60 "," $ 1,478.68 ",138.74%,51.15," $ 2,443.90 ",-4.12%,-78.84,7.05,346.47,8.38%," $ 4,949.50 ", $ 590.66 ,871.77," $ 1,375.17 ", $ 989.90 ," $ 1,187.88 ",59066,985.5,764.8,536.35,-319.7,476.95,6,87.62%,42.92,Battery,43.28%,19.91%,12.89%,8.01%,-4.42%,6.90%, $ 989.90 , $ 1,187.00 , $ 1,339.96 , $ 1,447.23 , $ 1,383.29 ,N/A,7%,1%
BackDoor,AMDL,10,$36.56,5/1/2026, $ 213.20 , $ 57.88 ,58.32%,8.88, $ 213.20 ,7.94%,-6.88,8.33,25.59,0.62%, $ 365.60 , $ 590.66 ,-22.51, $ 53.83 , $ 36.56 , $ 43.87 ,59066,-0.3,88.6,79.8,-75.6,120.7,146,6.86%,12.84,Battery,53.94%,-0.08%,24.25%,17.58%,-14.17%,26.35%, $ 36.56 , $ 36.53 , $ 45.39 , $ 53.37 , $ 45.81 ,N/A,7%,1%
BackDoor,INTW,20,$239.52,5/1/2026," $ 1,748.60 ", $ 326.95 ,36.50%,72.86," $ 1,748.60 ",1.96%,-56.41,5.21,335.33,8.11%," $ 4,790.40 ", $ 590.66 ,209.99, $ 304.06 , $ 239.52 , $ 287.42 ,59066,11.8,912.2,986.4,-1072.4,910.6,26,77.49%,15.06,Battery,36.68%,0.25%,19.00%,17.26%,-16.00%,16.18%, $ 239.52 , $ 240.11 , $ 285.72 , $ 335.04 , $ 281.42 ,N/A,7%,1%
VZ,EOSE,300, $ 16.06 ,10/21/2025," $ (2,400.00)", $ 8.06 ,-49.81%,-11.11, $ 117.00 ,-1.35%,-3.77,0.73,161.07,0.59%," $ 2,418.00 "," $ 4,073.85 ",-5.52, $ 7.50 , $ 7.67 , $ 9.20 ,407385,-366,-27,576,-420,354,7221,4.15%,5.7,Battery,13.13%,-15.91%,-1.40%,30.19%,-16.91%,17.15%, $ 7.67 , $ 6.45 , $ 6.36 , $ 8.28 , $ 6.88 ,2.56,7%,1%
VZ,EOSE,300, $ 17.72 ,10/21/2025," $ (2,898.00)", $ 8.06 ,-54.51%,-13.42, $ 117.00 ,-1.35%,-3.77,0.73,161.07,0.59%," $ 2,418.00 "," $ 4,073.85 ",-5.52, $ 7.50 , $ 7.67 , $ 9.20 ,407385,-366,-27,576,-420,354,7221,4.15%,5.7,Battery,13.13%,-15.91%,-1.40%,30.19%,-16.91%,17.15%, $ 7.67 , $ 6.45 , $ 6.36 , $ 8.28 , $ 6.88 ,2.56,7%,1%
VZ,EOSE,117, $ 17.57 ,1/21/2026," $ (1,112.67)", $ 8.06 ,-54.13%,-8.97, $ 45.63 ,-1.35%,-1.47,0.73,62.82,0.23%, $ 943.02 ," $ 4,073.85 ",-26.76, $ 7.50 , $ 7.67 , $ 9.20 ,407385,-142.74,-10.53,224.64,-163.8,138.06,7221,1.62%,5.7,Semis,13.13%,-15.91%,-1.40%,30.19%,-16.91%,17.15%, $ 7.67 , $ 6.45 , $ 6.36 , $ 8.28 , $ 6.88 ,2.56,7%,1%
VZ,FIX,8," $ 1,372.00 ",3/13/2026," $ 3,650.00 "," $ 1,828.25 ",33.25%,50.00, $ 817.04 ,-0.39%,-26.36,0.85,966.63,3.59%," $ 14,626.00 "," $ 4,073.85 ",1319.02," $ 1,700.27 "," $ 1,726.12 "," $ 2,071.34 ",407385,1127.2,600,740.88,-1673.04,22,32,25.13%,703.3,Electrical,6.82%,8.16%,4.02%,4.77%,-10.28%,0.15%," $ 1,726.12 "," $ 1,867.02 "," $ 1,942.02 "," $ 2,034.63 "," $ 1,825.50 ",1.7,7%,1%
VZ,FIX,1,1718.41,04/24/2026, $ 109.84 ," $ 1,828.25 ",6.39%,3.54, $ 102.13 ,-0.39%,-3.29,0.85,120.83,0.45%," $ 1,828.25 "," $ 4,073.85 ",-2245.60," $ 1,700.27 "," $ 1,726.12 "," $ 2,071.34 ",407385,140.9,75,92.61,-209.13,2.75,32,3.14%,703.3,Electrical,6.82%,8.16%,4.02%,4.77%,-10.28%,0.15%," $ 1,726.12 "," $ 1,867.02 "," $ 1,942.02 "," $ 2,034.63 "," $ 1,825.50 ",1.7,7%,1%
VZ,HUT,100, $ 53.24 ,3/24/2026," $ 5,266.00 ", $ 105.90 ,98.91%,84.94," $ 2,903.00 ",0.61%,-93.65,5.40,538.09,2.60%," $ 10,590.00 "," $ 4,073.85 ",65.16, $ 98.49 , $ 76.87 , $ 92.24 ,407385,11,2420,714,-1501,1259,550,18.20%,21.23,Semis,38.27%,0.14%,31.44%,7.06%,-13.86%,13.49%, $ 76.87 , $ 76.98 , $ 101.18 , $ 108.32 , $ 93.31 ,N/A,7%,1%
VZ,JBL,15,340.23,05/01/2026, $ 361.80 , $ 364.35 ,7.09%,15.08, $ 361.80 ,2.23%,-11.67,1.01,357.24,1.34%," $ 5,465.25 "," $ 4,073.85 ",92.76, $ 338.85 , $ 340.23 , $ 408.28 ,407385,33.6,106.95,87.45,-338.25,472.05,160,9.39%,223.17,Bitcoin,7.52%,0.66%,2.08%,1.67%,-6.34%,9.45%, $ 340.23 , $ 342.47 , $ 349.60 , $ 355.43 , $ 332.88 ,1.29,7%,1%
VZ,LRCU,220,47,04/21/2026," $ 2,906.20 ", $ 60.21 ,28.11%,85.48," $ 2,780.80 ",2.07%,-89.70,3.80,732.58,3.25%," $ 13,246.20 "," $ 4,073.85 ",41.69, $ 56.00 , $ 47.57 , $ 57.08 ,407385,-869,2228.6,704,-1920.6,2637.8,967,22.76%,#N/A,Bitcoin,30.41%,-8.30%,23.22%,5.95%,-15.33%,24.87%, $ 47.57 , $ 43.62 , $ 53.75 , $ 56.95 , $ 48.22 ,N/A,7%,1%
VZ,LRCU,220,47,04/21/2026," $ 2,906.20 ", $ 60.21 ,28.11%,85.48," $ 2,780.80 ",2.07%,-89.70,3.80,732.58,3.25%," $ 13,246.20 "," $ 4,073.85 ",41.69, $ 56.00 , $ 47.57 , $ 57.08 ,407385,-869,2228.6,704,-1920.6,2637.8,967,22.76%,#N/A,Bitcoin,30.41%,-8.30%,23.22%,5.95%,-15.33%,24.87%, $ 47.57 , $ 43.62 , $ 53.75 , $ 56.95 , $ 48.22 ,N/A,7%,1%
VZ,MOD,20,260.67,05/01/2026, $ (3.00), $ 260.52 ,-0.06%,-0.13, $ (3.00),4.16%,0.10,-0.01,364.94,1.28%," $ 5,210.40 "," $ 4,073.85 ",56.83, $ 242.28 , $ 260.67 , $ 312.80 ,407385,123.2,56.4,191,-694.2,320.6,223,8.95%,134.56,Electrical,1.09%,2.36%,1.06%,3.54%,-12.43%,6.56%, $ 260.67 , $ 266.83 , $ 269.65 , $ 279.20 , $ 244.49 ,1.66,7%,1%
VZ,MRVL,30,163.66,04/24/2026, $ 980.10 , $ 196.33 ,19.96%,31.62, $ 960.60 ,2.96%,-30.99,2.78,345.05,1.45%," $ 5,889.90 "," $ 4,073.85 ",60.54, $ 182.59 , $ 164.31 , $ 197.17 ,407385,19.2,-148.2,538.2,-50.4,601.8,296,10.12%,80.37,Semis,19.04%,0.39%,-2.99%,11.21%,-0.94%,11.38%, $ 164.31 , $ 164.95 , $ 160.01 , $ 177.95 , $ 176.27 ,2.25,7%,1%
VZ,MRVL,40,147.54,04/20/2026," $ 1,951.60 ", $ 196.33 ,33.07%,55.76," $ 1,280.80 ",2.96%,-41.32,2.78,460.07,1.93%," $ 7,853.20 "," $ 4,073.85 ",94.48, $ 182.59 , $ 164.31 , $ 197.17 ,407385,25.6,-197.6,717.6,-67.2,802.4,296,13.49%,80.37,Semis,19.04%,0.39%,-2.99%,11.21%,-0.94%,11.38%, $ 164.31 , $ 164.95 , $ 160.01 , $ 177.95 , $ 176.27 ,2.25,7%,1%
VZ,MRVL,30,163.66,04/24/2026, $ 980.10 , $ 196.33 ,19.96%,31.62, $ 960.60 ,2.96%,-30.99,2.78,345.05,1.45%," $ 5,889.90 "," $ 4,073.85 ",60.54, $ 182.59 , $ 164.31 , $ 197.17 ,407385,19.2,-148.2,538.2,-50.4,601.8,296,10.12%,80.37,Semis,19.04%,0.39%,-2.99%,11.21%,-0.94%,11.38%, $ 164.31 , $ 164.95 , $ 160.01 , $ 177.95 , $ 176.27 ,2.25,7%,1%
VZ,MUU,50, $ 75.61 ,11/28/2025," $ 22,938.00 ", $ 534.37 ,606.75%,128.87," $ 14,213.50 ",-2.89%,-458.50,16.24,875.35,6.56%," $ 26,718.50 "," $ 4,073.85 ",452.89, $ 496.96 , $ 250.10 , $ 300.12 ,407385,2284.5,5944.5,10409,-7844,3419.5,109,45.91%,18.73,Memory,98.15%,18.27%,40.19%,50.20%,-25.19%,14.68%, $ 250.10 , $ 295.79 , $ 414.68 , $ 622.86 , $ 465.98 ,N/A,7%,1%
VZ,MUU,47, $ 190.41 ,2/27/2026," $ 16,166.12 ", $ 534.37 ,180.64%,185.82," $ 13,360.69 ",-2.89%,-430.99,16.24,822.83,6.17%," $ 25,115.39 "," $ 4,073.85 ",447.69, $ 496.96 , $ 250.10 , $ 300.12 ,407385,2147.43,5587.83,9784.46,-7373.36,3214.33,109,43.16%,18.73,Memory,98.15%,18.27%,40.19%,50.20%,-25.19%,14.68%, $ 250.10 , $ 295.79 , $ 414.68 , $ 622.86 , $ 465.98 ,N/A,7%,1%
VZ,NOK,1000,10.57,04/24/2026," $ 4,900.00 ", $ 15.47 ,46.36%,158.06," $ 5,010.00 ",9.10%,-161.61,6.84,732.20,3.80%," $ 15,470.00 "," $ 4,073.85 ",11.40, $ 14.39 , $ 10.46 , $ 12.55 ,407385,2840,-950,2360,-1040,1800,3762,26.58%,4.08,AI,45.22%,27.15%,-7.14%,19.11%,-7.07%,13.17%, $ 10.46 , $ 13.30 , $ 12.35 , $ 14.71 , $ 13.67 ,1.12,7%,1%
VZ,NOK,1000,10.57,04/24/2026," $ 4,900.00 ", $ 15.47 ,46.36%,158.06," $ 5,010.00 ",9.10%,-161.61,6.84,732.20,3.80%," $ 15,470.00 "," $ 4,073.85 ",11.40, $ 14.39 , $ 10.46 , $ 12.55 ,407385,2840,-950,2360,-1040,1800,3762,26.58%,4.08,AI,45.22%,27.15%,-7.14%,19.11%,-7.07%,13.17%, $ 10.46 , $ 13.30 , $ 12.35 , $ 14.71 , $ 13.67 ,1.12,7%,1%
VZ,RIOX,80, $ 45.07 ,10/15/2025, $ 467.20 , $ 50.91 ,12.96%,2.10," $ 1,515.20 ",-0.37%,-48.88,8.46,179.03,1.00%," $ 4,072.80 "," $ 4,073.85 ",-0.01, $ 47.35 , $ 31.97 , $ 38.36 ,407385,-89.6,1587.2,237.6,-779.2,559.2,1143,7.00%,60.3,DataCenter,64.43%,-3.50%,64.31%,5.86%,-18.15%,15.92%, $ 31.97 , $ 30.85 , $ 50.69 , $ 53.66 , $ 43.92 ,N/A,7%,1%
VZ,RIOX,200, $ 37.25 ,10/21/2025," $ 2,732.00 ", $ 50.91 ,36.67%,12.65," $ 3,788.00 ",-0.37%,-122.19,8.46,447.58,2.50%," $ 10,182.00 "," $ 4,073.85 ",30.54, $ 47.35 , $ 31.97 , $ 38.36 ,407385,-224,3968,594,-1948,1398,1143,17.50%,60.3,AI,64.43%,-3.50%,64.31%,5.86%,-18.15%,15.92%, $ 31.97 , $ 30.85 , $ 50.69 , $ 53.66 , $ 43.92 ,N/A,7%,1%
VZ,ROBN,100, $ 108.86 ,10/31/2025," $ (9,121.00)", $ 17.65 ,-83.79%,-44.28, $ (699.00),-6.27%,22.55,-4.05,172.48,0.43%," $ 1,765.00 "," $ 4,073.85 ",-23.09, $ 16.41 , $ 24.64 , $ 29.57 ,407385,-652,120,6,-138,-35,3297,3.03%,61.21,Bitcoin,-28.59%,-26.46%,6.62%,0.31%,-7.12%,-1.94%, $ 24.64 , $ 18.12 , $ 19.32 , $ 19.38 , $ 18.00 ,N/A,7%,1%
VZ,SITM,10,572.49,04/24/2026," $ 1,560.70 ", $ 728.56 ,27.26%,50.35," $ 1,583.00 ",2.36%,-51.06,3.97,399.18,1.79%," $ 7,285.60 "," $ 4,073.85 ",321.18, $ 677.56 , $ 570.26 , $ 684.31 ,407385,-116.3,2386.8,380,-1416.5,349,80,12.52%,202.85,Semis,33.53%,-2.04%,42.73%,4.77%,-16.96%,5.03%, $ 570.26 , $ 558.63 , $ 797.31 , $ 835.31 , $ 693.66 ,2.91,7%,1%
VZ,SITM,10,527.35,04/20/2026," $ 2,012.10 ", $ 728.56 ,38.15%,57.49," $ 1,583.00 ",2.36%,-51.06,3.97,399.18,1.79%," $ 7,285.60 "," $ 4,073.85 ",321.18, $ 677.56 , $ 570.26 , $ 684.31 ,407385,-116.3,2386.8,380,-1416.5,349,80,12.52%,202.85,Semis,33.53%,-2.04%,42.73%,4.77%,-16.96%,5.03%, $ 570.26 , $ 558.63 , $ 797.31 , $ 835.31 , $ 693.66 ,2.91,7%,1%
VZ,SITM,4,572.49,04/24/2026, $ 624.28 , $ 728.56 ,27.26%,20.14, $ 633.20 ,2.36%,-20.43,3.97,159.67,0.72%," $ 2,914.24 "," $ 4,073.85 ",-289.90, $ 677.56 , $ 570.26 , $ 684.31 ,407385,-46.52,954.72,152,-566.6,139.6,80,5.01%,202.85,Semis,33.53%,-2.04%,42.73%,4.77%,-16.96%,5.03%, $ 570.26 , $ 558.63 , $ 797.31 , $ 835.31 , $ 693.66 ,2.91,7%,1%
VZ,TTMI,35,157.01,05/01/2026," $ 1,151.85 ", $ 189.92 ,20.96%,47.99," $ 1,151.85 ",8.81%,-37.16,2.99,384.67,1.63%," $ 6,647.20 "," $ 4,073.85 ",73.52, $ 176.63 , $ 157.01 , $ 188.41 ,407385,69.3,-182.7,526.75,-259.35,997.85,306,11.42%,47.25,Semis,21.04%,1.26%,-3.28%,9.79%,-4.39%,17.66%, $ 157.01 , $ 158.99 , $ 153.77 , $ 168.82 , $ 161.41 ,2.11,7%,1%
VZ,VRTL,50, $ 110.42 ,2/27/2026," $ 2,547.50 ", $ 161.37 ,46.14%,29.28, $ (156.00),2.49%,5.03,-0.27,575.72,1.98%," $ 8,068.50 "," $ 4,073.85 ",79.89, $ 150.07 , $ 164.49 , $ 197.39 ,407385,162,491,1587.5,-2600,203.5,361,13.86%,48.35,Electrical,3.45%,1.97%,5.85%,17.88%,-24.84%,2.59%, $ 164.49 , $ 167.73 , $ 177.55 , $ 209.30 , $ 157.30 ,N/A,7%,1%
VZ,VRTL,50, $ 113.59 ,3/13/2026," $ 2,389.00 ", $ 161.37 ,42.06%,32.73, $ (156.00),2.49%,5.03,-0.27,575.72,1.98%," $ 8,068.50 "," $ 4,073.85 ",79.89, $ 150.07 , $ 164.49 , $ 197.39 ,407385,162,491,1587.5,-2600,203.5,361,13.86%,48.35,Electrical,3.45%,1.97%,5.85%,17.88%,-24.84%,2.59%, $ 164.49 , $ 167.73 , $ 177.55 , $ 209.30 , $ 157.30 ,N/A,7%,1%
VZ,ENLT,110,91.4,05/05/2026, $ 93.50 , $ 92.25 ,0.93%,4.68, $ 93.50 ,0.76%,-3.02,0.13,703.78,2.49%," $ 10,147.50 "," $ 4,073.85 ",55.22, $ 85.79 , $ 91.40 , $ 109.68 ,407385,0,-694.1,772.2,-735.9,751.3,631,17.44%,24.63,Energy,2.08%,0.00%,-6.90%,8.25%,-7.26%,8.00%, $ 91.40 , $ 91.40 , $ 85.09 , $ 92.11 , $ 85.42 ,360.05,7%,1%
VZ,FLEX,45,133.17,05/07/2026, $ (31.50), $ 132.47 ,-0.53%,-1.75, $ (31.50),1.07%,1.02,-0.08,419.49,1.46%," $ 5,961.15 "," $ 4,073.85 ",41.94, $ 123.20 , $ 133.17 , $ 159.80 ,407385,0,-7.2,485.55,-787.95,278.1,439,10.24%,49.87,Electrical,0.71%,0.00%,-0.12%,8.11%,-12.18%,4.89%, $ 133.17 , $ 133.17 , $ 133.01 , $ 143.80 , $ 126.29 ,1.46,7%,1%
VZ,FLEX,32,92.7,05/04/2026," $ 1,272.64 ", $ 132.47 ,42.90%,60.60," $ 1,272.64 ",1.07%,-41.05,6.13,207.65,1.04%," $ 4,239.04 "," $ 4,073.85 ",5.16, $ 123.20 , $ 92.70 , $ 111.24 ,407385,0,1289.92,345.28,-560.32,197.76,439,7.28%,49.87,Electrical,44.31%,0.00%,43.48%,8.11%,-12.18%,4.89%, $ 92.70 , $ 92.70 , $ 133.01 , $ 143.80 , $ 126.29 ,1.46,7%,1%
VZ,MOD,20,270.03,05/07/2026, $ (190.20), $ 260.52 ,-3.52%,-10.57, $ (190.20),4.16%,6.14,-0.50,378.04,1.28%," $ 5,210.40 "," $ 4,073.85 ",56.83, $ 242.28 , $ 270.03 , $ 324.04 ,407385,0,-7.6,191,-694.2,320.6,223,8.95%,134.56,Electrical,-2.47%,0.00%,-0.14%,3.54%,-12.43%,6.56%, $ 270.03 , $ 270.03 , $ 269.65 , $ 279.20 , $ 244.49 ,1.66,7%,1%
VZ,MYRG,15,434.49,05/08/2026, $ 186.15 , $ 446.90 ,2.86%,10.95, $ 186.15 ,1.81%,-6.00,0.41,456.21,1.65%," $ 6,703.50 "," $ 4,073.85 ",175.31, $ 415.62 , $ 434.49 , $ 521.39 ,407385,0,0,502.2,-409.35,93.3,130,11.52%,193.5,Electrical,3.29%,0.00%,0.00%,7.71%,-5.83%,1.41%, $ 434.49 , $ 434.49 , $ 434.49 , $ 467.97 , $ 440.68 ,1.3,7%,1%
VZ,MYRG,8,441,05/04/2026, $ 47.20 , $ 446.90 ,1.34%,2.25, $ 47.20 ,1.81%,-1.52,0.19,246.96,0.88%," $ 3,575.20 "," $ 4,073.85 ",-62.33, $ 415.62 , $ 441.00 , $ 529.20 ,407385,0,-108.96,324.72,-218.32,49.76,130,6.14%,193.5,Electrical,1.99%,0.00%,-3.09%,9.50%,-5.83%,1.41%, $ 441.00 , $ 441.00 , $ 427.38 , $ 467.97 , $ 440.68 ,1.3,7%,1%
VZ,NVT,32,166.66,05/07/2026, $ (64.00), $ 164.66 ,-1.20%,-3.56, $ (64.00),0.67%,2.06,-0.17,373.32,1.29%," $ 5,269.12 "," $ 4,073.85 ",37.35, $ 153.13 , $ 166.66 , $ 199.99 ,407385,0,2.24,197.76,-469.76,205.76,353,9.05%,78.42,Electrical,-0.68%,0.00%,0.04%,3.71%,-8.49%,4.06%, $ 166.66 , $ 166.66 , $ 166.73 , $ 172.91 , $ 158.23 ,1.32,7%,1%
VZ,NVT,32,161.54,05/04/2026, $ 99.84 , $ 164.66 ,1.93%,4.75, $ 99.84 ,0.67%,-3.22,0.28,361.85,1.29%," $ 5,269.12 "," $ 4,073.85 ",37.35, $ 153.13 , $ 161.54 , $ 193.85 ,407385,0,166.08,197.76,-469.76,205.76,353,9.05%,78.42,Electrical,2.49%,0.00%,3.21%,3.71%,-8.49%,4.06%, $ 161.54 , $ 161.54 , $ 166.73 , $ 172.91 , $ 158.23 ,1.32,7%,1%
VZ,STRL,7,813.38,05/07/2026, $ (563.08), $ 732.94 ,-9.89%,-31.28, $ (563.08),-0.11%,18.16,-1.41,398.56,1.26%," $ 5,130.58 "," $ 4,073.85 ",150.96, $ 681.63 , $ 813.38 , $ 976.06 ,407385,0,-13.79,300.09,-881.93,32.55,79,8.82%,267.59,Electrical,-9.07%,0.00%,-0.24%,5.28%,-14.75%,0.64%, $ 813.38 , $ 813.38 , $ 811.41 , $ 854.28 , $ 728.29 ,1.64,7%,1%
BackDoor,SNDK,3,1337.71,05/07/2026, $ 422.91 , $ 1,478.68 ,10.54%,23.50, $ 422.91 ,-4.12%,-13.64,1.51,280.92,1.09%," $ 4,436.04 "," $ 4,073.85 ",120.73," $ 1,375.17 "," $ 1,337.71 "," $ 1,605.25 ,407385,0,6.75,321.81,-191.82,286.17,39,7.62%,42.92,Memory,10.65%,0.00%,0.17%,8.01%,-4.42%,6.90%," $ 1,337.71 "," $ 1,337.71 "," $ 1,339.96 "," $ 1,447.23 "," $ 1,383.29 ",N/A,7%,1%
BackDoor,AMDL,88,45.46,05/07/2026," $ 1,092.96 ", $ 57.88 ,27.32%,60.72," $ 1,092.96 ",7.94%,-35.26,3.90,280.03,1.25%," $ 5,093.44 "," $ 4,073.85 ",11.59, $ 53.83 , $ 45.46 , $ 54.55 ,407385,0,-6.16,702.24,-665.28,1062.16,1005,8.75%,12.84,Semis,29.61%,0.00%,-0.15%,17.58%,-14.17%,26.35%, $ 45.46 , $ 45.46 , $ 45.39 , $ 53.37 , $ 45.81 ,N/A,7%,1%
BackDoor,NEBX,100,87.34,05/05/2026," $ 3,026.00 ", $ 117.60 ,34.65%,151.30," $ 3,026.00 ",-5.61%,-97.61,4.95,611.38,2.89%," $ 11,760.00 "," $ 4,073.85 ",76.86, $ 109.37 , $ 87.34 , $ 104.81 ,407385,0,542,2177,-1203,1510,495,20.21%,#N/A,AI,33.90%,0.00%,6.21%,23.47%,-10.50%,14.73%, $ 87.34 , $ 87.34 , $ 92.76 , $ 114.53 , $ 102.50 ,N/A,7%,1%
BackDoor,AMDL,200,35.15,05/05/2026," $ 4,546.00 ", $ 57.88 ,64.67%,227.30," $ 4,546.00 ",7.94%,-146.65,9.24,492.10,2.84%," $ 11,576.00 "," $ 4,073.85 ",37.51, $ 53.83 , $ 35.15 , $ 42.18 ,407385,0,2048,1596,-1512,2414,1005,19.89%,12.84,Semis,58.90%,0.00%,29.13%,17.58%,-14.17%,26.35%, $ 35.15 , $ 35.15 , $ 45.39 , $ 53.37 , $ 45.81 ,N/A,7%,1%
BackDoor,DLLL,100,58.67,05/05/2026," $ 4,582.00 ", $ 104.49 ,78.10%,229.10," $ 4,582.00 ",32.63%,-147.81,11.16,410.69,2.56%," $ 10,449.00 "," $ 4,073.85 ",63.75, $ 97.18 , $ 58.67 , $ 70.40 ,407385,0,785,705,-528,3620,557,17.95%,28.58,AI,69.81%,0.00%,13.38%,10.60%,-7.18%,53.01%, $ 58.67 , $ 58.67 , $ 66.52 , $ 73.57 , $ 68.29 ,N/A,7%,1%
BackDoor,AMDL,47,32.46,05/04/2026," $ 1,194.74 ", $ 57.88 ,78.31%,56.89," $ 1,194.74 ",7.94%,-38.54,11.19,106.79,0.67%," $ 2,720.36 "," $ 4,073.85 ",-28.80, $ 53.83 , $ 32.46 , $ 38.95 ,407385,0,607.71,375.06,-355.32,567.29,1005,4.67%,12.84,Semis,69.60%,0.00%,39.83%,17.58%,-14.17%,26.35%, $ 32.46 , $ 32.46 , $ 45.39 , $ 53.37 , $ 45.81 ,N/A,7%,1%
VZ,SANM,8,244.52,05/22/2026, $ 15.36 , $ 246.44 ,0.79%,5.12, $ 15.36 ,5.15%,-0.50,0.11,136.93,0.48%," $ 1,971.52 "," $ 4,073.85 ",-262.79, $ 229.19 , $ 244.52 , $ 293.42 ,407385,0,0,0,0,15.36,236,3.39%,116.04,Semis,0.79%,0.00%,0.00%,0.00%,0.00%,0.79%, $ 244.52 , $ 244.52 , $ 244.52 , $ 244.52 , $ 244.52 ,1.51,7%,1%
VZ,DOCN,15,158.13,05/22/2026, $ 4.95 , $ 158.46 ,0.21%,1.65, $ 4.95 ,0.07%,-0.16,0.03,166.04,0.58%," $ 2,376.90 "," $ 4,073.85 ",-113.13, $ 147.37 , $ 158.13 , $ 189.76 ,407385,0,0,0,0,4.95,367,4.08%,27.86,Semis,0.21%,0.00%,0.00%,0.00%,0.00%,0.21%, $ 158.13 , $ 158.13 , $ 158.13 , $ 158.13 , $ 158.13 ,1.42,7%,1%
VZ,ASX,57,34.78,05/22/2026, $ 1.71 , $ 34.81 ,0.09%,0.57, $ 1.71 ,6.65%,-0.06,0.01,138.77,0.49%," $ 1,984.17 "," $ 4,073.85 ",-36.66, $ 32.37 , $ 34.78 , $ 41.74 ,407385,0,0,0,0,1.71,1672,3.41%,9.5,Semis,0.09%,0.00%,0.00%,0.00%,0.00%,0.09%, $ 34.78 , $ 34.78 , $ 34.78 , $ 34.78 , $ 34.78 ,1.61,7%,1%
VZ,TSEM,17,283.24,05/22/2026, $ 3.23 , $ 283.43 ,0.07%,1.08, $ 3.23 ,1.58%,-0.10,0.01,337.06,1.18%," $ 4,818.31 "," $ 4,073.85 ",43.79, $ 263.59 , $ 283.24 , $ 339.89 ,407385,0,0,0,0,3.23,205,8.28%,45.75,Semis,0.07%,0.00%,0.00%,0.00%,0.00%,0.07%, $ 283.24 , $ 283.24 , $ 283.24 , $ 283.24 , $ 283.24 ,0.85,7%,1%
VZ,DOCN,28,161.58,05/21/2026, $ (87.36), $ 158.46 ,-1.93%,-21.84, $ (87.36),0.07%,2.82,-0.28,316.70,1.09%," $ 4,436.88 "," $ 4,073.85 ",12.97, $ 147.37 , $ 161.58 , $ 193.90 ,407385,0,0,0,0,-87.36,367,7.62%,27.86,Semis,-1.93%,0.00%,0.00%,0.00%,0.00%,-1.93%, $ 161.58 , $ 161.58 , $ 161.58 , $ 161.58 , $ 161.58 ,1.42,7%,1%
VZ,TTMI,30,172.63,05/14/2026, $ 518.70 , $ 189.92 ,10.02%,47.15, $ 518.70 ,8.81%,-16.73,1.43,362.52,1.40%," $ 5,697.60 "," $ 4,073.85 ",54.13, $ 176.63 , $ 172.63 , $ 207.16 ,407385,0,0,0,-336.6,855.3,306,9.79%,47.25,Semis,11.16%,0.00%,0.00%,0.00%,-6.50%,17.66%, $ 172.63 , $ 172.63 , $ 172.63 , $ 172.63 , $ 161.41 ,2.11,7%,1%
VZ,MTSI,14,382.05,05/14/2026, $ 55.02 , $ 385.98 ,1.03%,5.00, $ 55.02 ,1.45%,-1.77,0.15,374.41,1.33%," $ 5,403.72 "," $ 4,073.85 ",94.99, $ 358.96 , $ 382.05 , $ 458.46 ,407385,0,0,0,-322.98,378,151,9.29%,137.14,Semis,1.48%,0.00%,0.00%,0.00%,-6.04%,7.52%, $ 382.05 , $ 382.05 , $ 382.05 , $ 382.05 , $ 358.98 ,1.6,7%,1%
VZ,MUU,10,608,05/14/2026, $ (736.30), $ 534.37 ,-12.11%,-66.94, $ (736.30),-2.89%,23.75,-1.73,425.60,1.31%," $ 5,343.70 "," $ 4,073.85 ",126.99, $ 496.96 , $ 608.00 , $ 729.60 ,407385,0,0,0,-1420.2,683.9,109,9.18%,18.73,Semis,-8.68%,0.00%,0.00%,0.00%,-23.36%,14.68%, $ 608.00 , $ 608.00 , $ 608.00 , $ 608.00 , $ 465.98 ,N/A,7%,1%
VZ,TSEM,20,275.02,05/14/2026, $ 168.20 , $ 283.43 ,3.06%,15.29, $ 168.20 ,1.58%,-5.43,0.44,385.03,1.39%," $ 5,668.60 "," $ 4,073.85 ",79.74, $ 263.59 , $ 275.02 , $ 330.02 ,407385,0,0,0,-474.8,643,205,9.74%,45.75,Semis,4.16%,0.00%,0.00%,0.00%,-8.63%,12.79%, $ 275.02 , $ 275.02 , $ 275.02 , $ 275.02 , $ 251.28 ,0.85,7%,1%
VZ,SANM,20,250.18,05/11/2026, $ (74.80), $ 246.44 ,-1.49%,-5.34, $ (74.80),5.15%,2.41,-0.21,350.25,1.21%," $ 4,928.80 "," $ 4,073.85 ",42.75, $ 229.19 , $ 250.18 , $ 300.22 ,407385,0,0,-231.2,-278.4,434.8,236,8.47%,116.04,Semis,-0.78%,0.00%,0.00%,-4.62%,-5.83%,9.68%, $ 250.18 , $ 250.18 , $ 250.18 , $ 238.62 , $ 224.70 ,1.51,7%,1%
VZ,MTSI,14,359.17,05/11/2026, $ 375.34 , $ 385.98 ,7.46%,26.81, $ 375.34 ,1.45%,-12.11,1.07,351.99,1.33%," $ 5,403.72 "," $ 4,073.85 ",94.99, $ 358.96 , $ 359.17 , $ 431.00 ,407385,0,0,313.32,-315.98,378,151,9.29%,137.14,Semis,7.84%,0.00%,0.00%,6.23%,-5.92%,7.52%, $ 359.17 , $ 359.17 , $ 359.17 , $ 381.55 , $ 358.98 ,1.6,7%,1%
VZ,DOCN,20,161.26,05/11/2026, $ (56.00), $ 158.46 ,-1.74%,-4.00, $ (56.00),0.07%,1.81,-0.25,225.76,0.78%," $ 3,169.20 "," $ 4,073.85 ",-45.23, $ 147.37 , $ 161.26 , $ 193.51 ,407385,0,0,-41.6,-183.2,168.8,367,5.45%,27.86,Semis,-1.42%,0.00%,0.00%,-1.29%,-5.75%,5.63%, $ 161.26 , $ 161.26 , $ 161.26 , $ 159.18 , $ 150.02 ,1.42,7%,1%
VZ,ASX,150,35.15,05/11/2026, $ (51.00), $ 34.81 ,-0.97%,-3.64, $ (51.00),6.65%,1.65,-0.14,369.08,1.28%," $ 5,221.50 "," $ 4,073.85 ",7.65, $ 32.37 , $ 35.15 , $ 42.18 ,407385,0,0,48,-687,588,1672,8.97%,9.5,Semis,0.69%,0.00%,0.00%,0.91%,-12.91%,12.69%, $ 35.15 , $ 35.15 , $ 35.15 , $ 35.47 , $ 30.89 ,1.61,7%,1%`;

// Application State
let appState = {
  rawCSV: '',
  tranches: [],       // Raw purchases/lots
  aggregated: [],     // Grouped by Symbol
  sectors: {},        // Value per sector
  accounts: {},       // Value per account
  portfolioValue: 0,
  totalCost: 0,
  pnlTotal: 0,
  pnlTotalPct: 0,
  healthScore: 100,
  warnings: [],
  tickerPrices: {
    SPY: { price: 512.45, pct: +0.42 },
    QQQ: { price: 438.90, pct: +0.68 },
    IWM: { price: 202.10, pct: -0.15 },
    DIA: { price: 391.20, pct: +0.10 }
  },
  charts: {}          // Chart.js instances
};

// Start application
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  setupNavigation();
  setupDragAndDrop();
  setupSimulatorControls();
  setupGoogleSheetSync();
  
  // Try to load cached data or sync Google Sheet
  const gsheetUrl = localStorage.getItem('risk_manager_gsheet_url');
  const cachedCSV = localStorage.getItem('risk_manager_csv');
  
  if (gsheetUrl) {
    console.log("Syncing from saved Google Sheet URL...");
    const success = await syncGoogleSheet(gsheetUrl);
    if (!success && cachedCSV) {
      console.log("Failed to sync live Google Sheet, loading cached CSV...");
      processCSV(cachedCSV);
    }
  } else if (cachedCSV) {
    console.log("Loading portfolio from cache...");
    processCSV(cachedCSV);
  } else {
    try {
      // Attempt to load the local CSV file
      const response = await fetch('./Positions - Portfolio.csv');
      if (response.ok) {
        const text = await response.text();
        console.log("Loaded portfolio CSV from server.");
        processCSV(text);
      } else {
        throw new Error("Local CSV file not found on server.");
      }
    } catch (e) {
      console.warn("Failed to auto-load CSV, using default embedded portfolio data:", e.message);
      processCSV(DEFAULT_CSV_DATA);
    }
  }

  // Set up live market ticker simulation
  setInterval(simulateTicker, 4000);
}

function setupGoogleSheetSync() {
  const syncBtn = document.getElementById('gsheet-sync-btn');
  const urlInput = document.getElementById('gsheet-url-input');
  const instructionsBtn = document.getElementById('gsheet-instructions-btn');
  const headerSyncBtn = document.getElementById('gsheet-header-sync-btn');

  if (syncBtn && urlInput) {
    syncBtn.addEventListener('click', async () => {
      const url = urlInput.value.trim();
      if (!url) {
        alert("Please enter a valid Google Sheets published CSV URL.");
        return;
      }
      
      syncBtn.innerText = "Syncing...";
      syncBtn.disabled = true;
      
      const success = await syncGoogleSheet(url);
      
      syncBtn.innerText = "Sync";
      syncBtn.disabled = false;
      
      if (success) {
        localStorage.setItem('risk_manager_gsheet_url', url);
        alert("Google Sheet synced successfully and saved for auto-load!");
      } else {
        alert("Failed to fetch or parse the Google Sheet. Please verify it is published to the web as a CSV.");
      }
    });
  }

  if (headerSyncBtn) {
    headerSyncBtn.addEventListener('click', async () => {
      const url = localStorage.getItem('risk_manager_gsheet_url');
      if (url) {
        headerSyncBtn.innerHTML = '<i class="spinner" style="width: 14px; height: 14px; margin-bottom: 0; border-width: 2px;"></i> Syncing...';
        headerSyncBtn.disabled = true;
        
        const success = await syncGoogleSheet(url);
        
        headerSyncBtn.innerHTML = '<i data-lucide="refresh-cw"></i> Sync Google Sheet';
        headerSyncBtn.disabled = false;
        lucide.createIcons();
        
        if (success) {
          alert("Google Sheet re-synced successfully!");
        } else {
          alert("Failed to sync. Please check your internet connection or the Google Sheet link.");
        }
      }
    });
  }

  if (instructionsBtn) {
    instructionsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert(
        "To publish a Google Sheet as a CSV:\n\n" +
        "1. Open your Google Sheet.\n" +
        "2. Click 'File' > 'Share' > 'Publish to Web'.\n" +
        "3. In the dialog, select the tab you want to publish (or Entire Document).\n" +
        "4. Change the dropdown from 'Web page' to 'Comma-separated values (.csv)'.\n" +
        "5. Click 'Publish' and copy the generated link.\n" +
        "6. Paste that link here!"
      );
    });
  }
}

async function syncGoogleSheet(url) {
  try {
    let fetchUrl = url;
    if (url.includes('docs.google.com/spreadsheets') && !url.includes('output=csv')) {
      if (url.includes('/edit')) {
        fetchUrl = url.split('/edit')[0] + '/export?format=csv';
      }
    }

    const response = await fetch(fetchUrl);
    if (!response.ok) throw new Error("Network response error");
    
    const text = await response.text();
    if (text.toLowerCase().includes('account') && text.toLowerCase().includes('symbol')) {
      localStorage.setItem('risk_manager_csv', text);
      processCSV(text);
      
      const headerSyncBtn = document.getElementById('gsheet-header-sync-btn');
      if (headerSyncBtn) headerSyncBtn.style.display = 'inline-flex';
      
      return true;
    } else {
      console.error("Parsed Google Sheet content does not appear to contain headers 'Account' and 'Symbol'.");
      return false;
    }
  } catch (e) {
    console.error("Failed to fetch Google Sheet CSV data:", e);
    return false;
  }
}

// Navigation Tabs
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-item button');
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const activeTabId = btn.getAttribute('data-tab');
      
      // Update nav class
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      btn.parentElement.classList.add('active');
      
      // Update tab views
      document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
      const activePane = document.getElementById(activeTabId);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });

  // Global search input
  const searchInput = document.getElementById('search-positions');
  if (searchInput) {
    searchInput.addEventListener('input', filterAndRenderTable);
  }

  // Dropdown filters
  const accountFilter = document.getElementById('filter-account');
  const sectorFilter = document.getElementById('filter-sector');
  const statusFilter = document.getElementById('filter-status');

  if (accountFilter) accountFilter.addEventListener('change', filterAndRenderTable);
  if (sectorFilter) sectorFilter.addEventListener('change', filterAndRenderTable);
  if (statusFilter) statusFilter.addEventListener('change', filterAndRenderTable);
}

// Drag & Drop CSV Upload
function setupDragAndDrop() {
  const landingZone = document.getElementById('landing-zone');
  const fileInput = document.getElementById('csv-file-input');

  if (!landingZone || !fileInput) return;

  // Click landing zone to browse
  landingZone.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  });

  // Drag-and-drop event handlers
  ['dragenter', 'dragover'].forEach(eventName => {
    landingZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      landingZone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    landingZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      landingZone.classList.remove('dragover');
    }, false);
  });

  landingZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const file = dt.files[0];
    if (file) handleFile(file);
  });
}

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    localStorage.setItem('risk_manager_csv', text);
    processCSV(text);
  };
  reader.readAsText(file);
}

// Parse CSV manually (robust parser)
function parseCSV(text) {
  const lines = [];
  let line = [];
  let cell = '';
  let inQuote = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i+1];
    
    if (char === '"') {
      inQuote = !inQuote;
    } else if (char === ',' && !inQuote) {
      line.push(cell.trim());
      cell = '';
    } else if ((char === '\r' || char === '\n') && !inQuote) {
      if (char === '\r' && nextChar === '\n') i++; // Skip \n after \r
      line.push(cell.trim());
      if (line.length > 1 || line[0] !== '') {
        lines.push(line);
      }
      line = [];
      cell = '';
    } else {
      cell += char;
    }
  }
  if (cell !== '' || line.length > 0) {
    line.push(cell.trim());
    lines.push(line);
  }
  return lines;
}

// Cleaning helpers
function parseCurrency(val) {
  if (!val) return 0;
  let cleaned = val.replace(/\s/g, '').replace(/\$/g, '').replace(/,/g, '');
  if (cleaned.startsWith('(') && cleaned.endsWith(')')) {
    cleaned = '-' + cleaned.slice(1, -1);
  }
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

function parsePercent(val) {
  if (!val) return 0;
  const cleaned = val.replace(/\s/g, '').replace(/%/g, '').replace(/,/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

function parseNumber(val) {
  if (!val) return 0;
  const cleaned = val.replace(/\s/g, '').replace(/,/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

// Process the raw CSV text
function processCSV(text) {
  appState.rawCSV = text;
  
  const rawLines = parseCSV(text);
  if (rawLines.length < 2) {
    alert("Invalid CSV format. Please upload a valid positions CSV.");
    return;
  }

  // Normalize header names to lowercase and strip whitespaces
  const headers = rawLines[0].map(h => h.trim().replace(/\s+/g, ' ').toLowerCase());
  
  const tranches = [];
  
  for (let i = 1; i < rawLines.length; i++) {
    const row = rawLines[i];
    if (row.length < headers.length) continue;
    
    const rawObj = {};
    headers.forEach((header, index) => {
      rawObj[header] = row[index];
    });

    const symbol = rawObj['symbol'];
    if (!symbol || symbol === '#N/A' || symbol === '') continue;

    // Standardize object values
    const tranche = {
      id: `tranche-${i}`,
      account: rawObj['account'] || 'Default',
      symbol: symbol.toUpperCase(),
      shares: parseNumber(rawObj['# of shares'] || rawObj['shares']),
      entryPrice: parseCurrency(rawObj['actualentryprice'] || rawObj['entry price']),
      openDate: rawObj['actualopendate'] || rawObj['open date'] || 'Unknown',
      currentPrice: parseCurrency(rawObj['share price'] || rawObj['as of date price']),
      pnlDollar: parseCurrency(rawObj['actual$change'] || rawObj['$ change']),
      pnlPercent: parsePercent(rawObj['actual%change'] || rawObj['actual roi/day']),
      currentSize: parseCurrency(rawObj['current size'] || rawObj['portfolio']),
      trailingStop: parseCurrency(rawObj['trailing stop loss']),
      stopLossPercent: parsePercent(rawObj['stop loss'] || '7%'),
      idealShares: parseNumber(rawObj['ideal shares']),
      sector: rawObj['sector'] || 'Other',
      beta: parseNumber(rawObj['beta']) || 1.0,
      riskTrade: rawObj['risk/trade'] || '1%',
      riskReward: parseNumber(rawObj['risk:reward'])
    };

    // Calculate trailing stop if it was missing but we have stopLossPercent
    if (tranche.trailingStop === 0 && tranche.stopLossPercent > 0) {
      tranche.trailingStop = tranche.entryPrice * (1 - (tranche.stopLossPercent / 100));
    }

    // Safety checks
    if (tranche.shares > 0 && tranche.currentSize === 0) {
      tranche.currentSize = tranche.shares * tranche.currentPrice;
    }
    if (tranche.entryPrice > 0 && tranche.shares > 0 && tranche.pnlDollar === 0) {
      tranche.pnlDollar = tranche.currentSize - (tranche.shares * tranche.entryPrice);
    }
    if (tranche.entryPrice > 0 && tranche.pnlPercent === 0) {
      tranche.pnlPercent = ((tranche.currentPrice - tranche.entryPrice) / tranche.entryPrice) * 100;
    }

    tranches.push(tranche);
  }

  appState.tranches = tranches;

  // Process data for dashboard
  aggregatePositions();
  calculatePortfolioRisk();
  generateRecommendations();
  
  // Render everything
  hideLandingZone();
  updateHeaderStats();
  renderDashboardCharts();
  populateFilters();
  filterAndRenderTable();
  renderNews();
  updateSimulatorDropdown();
  runSimulation();
}

function hideLandingZone() {
  document.getElementById('landing-section').style.display = 'none';
  document.getElementById('dashboard-wrapper').style.display = 'block';
}

// Group positions by symbol
function aggregatePositions() {
  const groups = {};
  
  appState.tranches.forEach(t => {
    if (!groups[t.symbol]) {
      groups[t.symbol] = {
        symbol: t.symbol,
        sector: t.sector,
        beta: t.beta,
        shares: 0,
        cost: 0,
        currentValue: 0,
        pnlDollar: 0,
        pnlPercent: 0,
        tranchesCount: 0,
        accounts: new Set(),
        stopBreached: false,
        stopWarning: false,
        stopLoss: t.stopLossPercent,
        idealShares: 0
      };
    }
    
    const g = groups[t.symbol];
    g.shares += t.shares;
    g.cost += t.shares * t.entryPrice;
    g.currentValue += t.currentSize;
    g.tranchesCount += 1;
    g.accounts.add(t.account);
    g.idealShares += t.idealShares || 0;

    // Tranche stop loss checks
    const distanceToStop = (t.currentPrice - t.trailingStop) / t.currentPrice;
    if (t.currentPrice <= t.trailingStop) {
      g.stopBreached = true;
    } else if (distanceToStop <= 0.05) { // within 5%
      g.stopWarning = true;
    }
  });

  appState.aggregated = Object.values(groups).map(g => {
    g.avgEntry = g.shares > 0 ? (g.cost / g.shares) : 0;
    g.pnlDollar = g.currentValue - g.cost;
    g.pnlPercent = g.cost > 0 ? ((g.currentValue - g.cost) / g.cost * 100) : 0;
    g.accounts = Array.from(g.accounts).join(', ');
    return g;
  });
}

// Global Risk Metrics
function calculatePortfolioRisk() {
  let portfolioValue = 0;
  let totalCost = 0;
  const sectors = {};
  const accounts = {};
  
  appState.tranches.forEach(t => {
    portfolioValue += t.currentSize;
    totalCost += t.shares * t.entryPrice;
    
    // Group sector sizes
    sectors[t.sector] = (sectors[t.sector] || 0) + t.currentSize;
    
    // Group account sizes
    accounts[t.account] = (accounts[t.account] || 0) + t.currentSize;
  });

  appState.portfolioValue = portfolioValue;
  appState.totalCost = totalCost;
  appState.pnlTotal = portfolioValue - totalCost;
  appState.pnlTotalPct = totalCost > 0 ? ((portfolioValue - totalCost) / totalCost * 100) : 0;
  appState.sectors = sectors;
  appState.accounts = accounts;
}

// Generate Actionable Advice for Risk Manager Box
function generateRecommendations() {
  const warnings = [];
  const recs = [];
  let score = 100;

  // 1. Check Trailing Stop Breaches (Tranche-level)
  appState.tranches.forEach(t => {
    const isBreached = t.currentPrice <= t.trailingStop;
    const distancePct = ((t.currentPrice - t.trailingStop) / t.currentPrice) * 100;
    
    if (isBreached) {
      score -= 8;
      recs.push({
        type: 'sell',
        symbol: t.symbol,
        headline: `🚨 BREACH ALERT: SELL ${t.symbol} in ${t.account}`,
        description: `Current price of $${t.currentPrice.toFixed(2)} is below trailing stop loss of $${t.trailingStop.toFixed(2)}. Cut loss/lock in gains immediately.`
      });
    } else if (distancePct <= 5.0) { // Within 5% of stop loss
      score -= 3;
      recs.push({
        type: 'reduce',
        symbol: t.symbol,
        headline: `⚠️ WARNING: ${t.symbol} Nearing Stop Loss`,
        description: `${t.account} position ($${t.currentPrice.toFixed(2)}) is only ${distancePct.toFixed(1)}% above trailing stop of $${t.trailingStop.toFixed(2)}. Tighten stop or reduce sizing.`
      });
    }
  });

  // 2. Concentration Warnings (Symbol-level)
  appState.aggregated.forEach(g => {
    const weight = (g.currentValue / appState.portfolioValue) * 100;
    if (weight > 15.0) {
      score -= 10;
      recs.push({
        type: 'reduce',
        symbol: g.symbol,
        headline: `⚖️ OVER-CONCENTRATION: Reduce ${g.symbol}`,
        description: `${g.symbol} represents ${weight.toFixed(1)}% of your total portfolio ($${g.currentValue.toLocaleString('en-US', {maximumFractionDigits: 0})}). Target maximum concentration is 15%.`
      });
    }
    
    // Accumulate recommendations
    // If stock is performing well (PnL > 10%), shares are significantly below ideal, and no stop breach
    if (g.pnlPercent > 10.0 && g.shares < g.idealShares && !g.stopBreached && !g.stopWarning) {
      const underShares = g.idealShares - g.shares;
      const addValue = underShares * (g.currentValue / g.shares);
      
      // Check that adding won't violate concentration rules
      if (((g.currentValue + addValue) / appState.portfolioValue) * 100 < 15.0) {
        recs.push({
          type: 'accumulate',
          symbol: g.symbol,
          headline: `📈 OPPORTUNITY: Accumulate ${g.symbol}`,
          description: `Current position is performing well (+${g.pnlPercent.toFixed(1)}%) but is under-allocated. Ideal shares: ${g.idealShares}, Current shares: ${g.shares}. Suggest buying up to ${underShares} additional shares.`
        });
      }
    }
  });

  // 3. Sector Exposure Warnings
  Object.keys(appState.sectors).forEach(sec => {
    const weight = (appState.sectors[sec] / appState.portfolioValue) * 100;
    if (weight > 25.0) {
      score -= 8;
      recs.push({
        type: 'reduce',
        symbol: sec,
        headline: `⚡ SECTOR RISK: High ${sec} exposure`,
        description: `Sectors allocation for ${sec} is at ${weight.toFixed(1)}% of portfolio. High correlation risk. Avoid adding new positions in this sector.`
      });
    }
  });

  // 4. Calculate Portfolio Beta
  let weightedBetaSum = 0;
  let totalValForBeta = 0;
  appState.tranches.forEach(t => {
    if (t.beta && t.beta > 0) {
      weightedBetaSum += t.beta * t.currentSize;
      totalValForBeta += t.currentSize;
    }
  });
  const portfolioBeta = totalValForBeta > 0 ? (weightedBetaSum / totalValForBeta) : 1.0;
  if (portfolioBeta > 1.8) {
    score -= 6;
    recs.push({
      type: 'hold',
      symbol: 'PORTFOLIO',
      headline: `📉 VOLATILITY WARNING: High Beta Portfolio`,
      description: `Weighted portfolio beta is ${portfolioBeta.toFixed(2)}, indicating 80%+ higher volatility than the S&P 500. Consider hedging or adding low-beta/defensive assets.`
    });
  }
  appState.portfolioBeta = portfolioBeta;

  // Make sure score stays between 0 and 100
  appState.healthScore = Math.max(0, Math.min(100, Math.round(score)));
  appState.warnings = recs;

  // Sort recommendations: Critical Sell first, then Reduce, Accumulate, Hold
  const order = { 'sell': 0, 'reduce': 1, 'accumulate': 2, 'hold': 3 };
  appState.warnings.sort((a, b) => order[a.type] - order[b.type]);
}

// Update Top stats values in HTML
function updateHeaderStats() {
  // Portfolio Value
  const valEl = document.getElementById('stat-portfolio-val');
  if (valEl) valEl.innerText = `$${appState.portfolioValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

  // Total PnL
  const pnlEl = document.getElementById('stat-total-pnl');
  if (pnlEl) {
    const sign = appState.pnlTotal >= 0 ? '+' : '';
    pnlEl.innerText = `${sign}$${appState.pnlTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${sign}${appState.pnlTotalPct.toFixed(2)}%)`;
    pnlEl.className = `value ${appState.pnlTotal >= 0 ? 'color-success' : 'color-danger'}`;
    const trendIcon = document.getElementById('pnl-trend');
    if (trendIcon) {
      trendIcon.className = `trend-badge ${appState.pnlTotal >= 0 ? 'up' : 'down'}`;
      trendIcon.innerHTML = appState.pnlTotal >= 0 ? '<i data-lucide="trending-up"></i>' : '<i data-lucide="trending-down"></i>';
    }
  }

  // Active Tranches
  const trEl = document.getElementById('stat-active-positions');
  if (trEl) {
    trEl.innerText = appState.tranches.length;
    const subEl = document.getElementById('stat-active-positions-sub');
    if (subEl) subEl.innerText = `${appState.aggregated.length} Unique Symbols`;
  }

  // Health Score Circular Progress
  const healthVal = document.getElementById('health-score-val');
  const healthProgress = document.getElementById('health-progress');
  if (healthVal && healthProgress) {
    healthVal.innerText = appState.healthScore;
    
    // Conic gradient mapping
    let color = 'var(--color-success)';
    if (appState.healthScore < 50) color = 'var(--color-danger)';
    else if (appState.healthScore < 80) color = 'var(--color-warning)';
    
    healthProgress.style.background = `conic-gradient(${color} ${appState.healthScore * 3.6}deg, #1e293b 0deg)`;
  }

  // Render Action items in box
  renderRiskManagerRecommendations();
  lucide.createIcons();
}

function renderRiskManagerRecommendations() {
  const container = document.getElementById('recommendations-container');
  if (!container) return;

  if (appState.warnings.length === 0) {
    container.innerHTML = `
      <div class="empty-recommendations">
        <i data-lucide="check-circle-2" style="color: var(--color-success); width: 48px; height: 48px; margin-bottom: 0.5rem;"></i>
        <p style="font-weight: 600;">Portfolio Health Excellent!</p>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">No breached stops or critical sizing warnings detected.</p>
      </div>
    `;
    return;
  }

  let html = '<div class="recommendations-list">';
  appState.warnings.forEach(w => {
    const badgeClass = w.type;
    const label = w.type === 'sell' ? 'Critical Sell' : w.type === 'reduce' ? 'Reduce' : w.type === 'accumulate' ? 'Buy Signal' : 'Info';
    
    html += `
      <div class="recommendation-item">
        <span class="rec-badge ${badgeClass}">${label}</span>
        <div class="rec-content">
          <div class="rec-headline">${w.headline}</div>
          <div class="rec-description">${w.description}</div>
        </div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

// Render dynamic charts
function renderDashboardCharts() {
  // Destroy existing charts to prevent hover bugs
  if (appState.charts.sectors) appState.charts.sectors.destroy();
  if (appState.charts.risks) appState.charts.risks.destroy();

  // 1. Sector Chart
  const sectorCtx = document.getElementById('sectorChart').getContext('2d');
  const sectorLabels = Object.keys(appState.sectors);
  const sectorData = Object.values(appState.sectors);
  
  appState.charts.sectors = new Chart(sectorCtx, {
    type: 'doughnut',
    data: {
      labels: sectorLabels,
      datasets: [{
        data: sectorData,
        backgroundColor: [
          '#06b6d4', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', 
          '#ef4444', '#ec4899', '#14b8a6', '#f43f5e', '#6366f1'
        ],
        borderWidth: 1,
        borderColor: '#1e293b'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#94a3b8',
            font: { family: 'Inter', size: 11 }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw;
              const percent = (value / appState.portfolioValue) * 100;
              return ` ${context.label}: $${value.toLocaleString('en-US', {maximumFractionDigits: 0})} (${percent.toFixed(1)}%)`;
            }
          }
        }
      },
      cutout: '65%'
    }
  });

  // 2. Risk Status Chart
  const riskCtx = document.getElementById('riskChart').getContext('2d');
  
  let breachedCount = 0;
  let warningCount = 0;
  let safeCount = 0;

  appState.tranches.forEach(t => {
    const isBreached = t.currentPrice <= t.trailingStop;
    const distancePct = ((t.currentPrice - t.trailingStop) / t.currentPrice) * 100;
    
    if (isBreached) breachedCount++;
    else if (distancePct <= 5.0) warningCount++;
    else safeCount++;
  });

  appState.charts.risks = new Chart(riskCtx, {
    type: 'pie',
    data: {
      labels: ['Safe', 'Warning (<5% to Stop)', 'Breached (SELL)'],
      datasets: [{
        data: [safeCount, warningCount, breachedCount],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 1,
        borderColor: '#1e293b'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#94a3b8',
            font: { family: 'Inter', size: 11 }
          }
        }
      }
    }
  });
}

// Populate table filters from loaded CSV data
function populateFilters() {
  const accountFilter = document.getElementById('filter-account');
  const sectorFilter = document.getElementById('filter-sector');

  if (!accountFilter || !sectorFilter) return;

  // Find unique accounts and sectors
  const accounts = new Set(['all']);
  const sectors = new Set(['all']);

  appState.tranches.forEach(t => {
    accounts.add(t.account);
    sectors.add(t.sector);
  });

  // Clear existing items except "all"
  accountFilter.innerHTML = '<option value="all">All Accounts</option>';
  sectorFilter.innerHTML = '<option value="all">All Sectors</option>';

  accounts.forEach(acc => {
    if (acc === 'all') return;
    accountFilter.innerHTML += `<option value="${acc}">${acc}</option>`;
  });

  sectors.forEach(sec => {
    if (sec === 'all') return;
    sectorFilter.innerHTML += `<option value="${sec}">${sec}</option>`;
  });
}

// Filter and Render the main positions table
function filterAndRenderTable() {
  const tbody = document.getElementById('positions-table-body');
  if (!tbody) return;

  const searchQuery = (document.getElementById('search-positions')?.value || '').toUpperCase();
  const accountVal = document.getElementById('filter-account')?.value || 'all';
  const sectorVal = document.getElementById('filter-sector')?.value || 'all';
  const statusVal = document.getElementById('filter-status')?.value || 'all';

  const filtered = appState.tranches.filter(t => {
    // Search match (Symbol or Sector)
    const matchesSearch = t.symbol.includes(searchQuery) || t.sector.toUpperCase().includes(searchQuery);
    
    // Account match
    const matchesAccount = (accountVal === 'all' || t.account === accountVal);
    
    // Sector match
    const matchesSector = (sectorVal === 'all' || t.sector === sectorVal);
    
    // Status match
    const isBreached = t.currentPrice <= t.trailingStop;
    const isWarning = !isBreached && (((t.currentPrice - t.trailingStop) / t.currentPrice) * 100 <= 5.0);
    const isSafe = !isBreached && !isWarning;
    
    let matchesStatus = true;
    if (statusVal === 'breached') matchesStatus = isBreached;
    else if (statusVal === 'warning') matchesStatus = isWarning;
    else if (statusVal === 'safe') matchesStatus = isSafe;

    return matchesSearch && matchesAccount && matchesSector && matchesStatus;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; color: var(--text-muted); padding: 3rem;">No active positions match your filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(t => {
    const isBreached = t.currentPrice <= t.trailingStop;
    const distStop = ((t.currentPrice - t.trailingStop) / t.currentPrice) * 100;
    
    let statusClass = 'safe';
    let statusLabel = 'Safe';
    if (isBreached) {
      statusClass = 'danger';
      statusLabel = 'Breached';
    } else if (distStop <= 5.0) {
      statusClass = 'warning';
      statusLabel = `Near Stop (${distStop.toFixed(1)}%)`;
    }

    const pnlSign = t.pnlDollar >= 0 ? '+' : '';
    const pnlClass = t.pnlDollar >= 0 ? 'positive' : 'negative';

    return `
      <tr>
        <td>
          <div class="symbol-badge-container">
            <span class="symbol-badge">${t.symbol}</span>
            <span class="account-lbl">${t.account}</span>
          </div>
        </td>
        <td><span class="badge badge-sector">${t.sector}</span></td>
        <td>${t.shares}</td>
        <td>$${t.entryPrice.toFixed(2)}</td>
        <td>$${t.currentPrice.toFixed(2)}</td>
        <td>$${t.trailingStop.toFixed(2)}</td>
        <td>
          <span class="pct-indicator ${pnlClass}">
            ${pnlSign}$${t.pnlDollar.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </span>
        </td>
        <td>
          <span class="pct-indicator ${pnlClass}">
            ${pnlSign}${t.pnlPercent.toFixed(2)}%
          </span>
        </td>
        <td>$${t.currentSize.toLocaleString('en-US', {maximumFractionDigits: 2})}</td>
        <td>
          <span class="status-indicator ${statusClass}">
            <span class="dot"></span>${statusLabel}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

// Generate context-aware financial news headlines based on user's portfolio
function generateDynamicNews(tranches) {
  const uniqueSymbols = Array.from(new Set(tranches.map(t => t.symbol)));
  if (uniqueSymbols.length === 0) return [];

  // Group performance
  const symbolPnls = {};
  tranches.forEach(t => {
    symbolPnls[t.symbol] = (symbolPnls[t.symbol] || 0) + t.pnlDollar;
  });

  const winners = uniqueSymbols.filter(s => symbolPnls[s] > 1000);
  const losers = uniqueSymbols.filter(s => symbolPnls[s] < -500);
  const others = uniqueSymbols.filter(s => symbolPnls[s] >= -500 && symbolPnls[s] <= 1000);

  const templates = [
    // Global market news
    {
      category: 'Market',
      title: 'Tech Sector Momentum Continues Amidst Infrastructure Upgrades',
      desc: 'US major indices edge higher as robust energy sector reports and semiconductor supply reliability bolster investor confidence. Analyst consensus remains bullish on enterprise AI hardware spend.',
      sentiment: 'bullish',
      symbol: 'SPY'
    },
    {
      category: 'Market',
      title: 'Federal Reserve Hints at Extended Pause on Rates',
      desc: 'Treasury yields stabilize as monetary policymakers signal a cautious approach to future interest rate adjustments, prompting mixed flows in growth assets and heavy industrials.',
      sentiment: 'neutral',
      symbol: 'SPY'
    }
  ];

  // Winner articles
  winners.forEach(sym => {
    templates.push({
      category: sym,
      title: `${sym} Shares Target New Multi-Month Highs on Institutional Buying`,
      desc: `Strong options flow and bullish broker upgrades propel ${sym} higher. Market makers note high delta sensitivity, alerting investors to potential squeeze parameters above current resistances.`,
      sentiment: 'bullish',
      symbol: sym
    });
    templates.push({
      category: sym,
      title: `Earnings Insight: How ${sym} Beat Q1 Whispers and Raised Full-Year Guidance`,
      desc: `Strong demand and operational scaling have positioned ${sym} at the top of its sector peer group. Management expressed confidence in double-digit EBITDA margin expansions.`,
      sentiment: 'bullish',
      symbol: sym
    });
  });

  // Loser articles
  losers.forEach(sym => {
    templates.push({
      category: sym,
      title: `${sym} Facing Short-Term Sector Downgrades, Capital Realignment`,
      desc: `Profit margins are squeezed as supply chains adapt. Analysts caution that ${sym} may undergo consolidation until capital efficiency milestones are achieved later this year.`,
      sentiment: 'bearish',
      symbol: sym
    });
  });

  // Random fillers for other portfolio components
  others.slice(0, 4).forEach(sym => {
    const coinFlip = Math.random() > 0.5;
    templates.push({
      category: sym,
      title: `${sym} Institutional Activity Surges: Key Levels to Watch`,
      desc: `Volume profile indicates high support aggregation at current levels. Short-term moving averages are crossing, signaling possible volatility breakout for ${sym} in the coming sessions.`,
      sentiment: coinFlip ? 'bullish' : 'neutral',
      symbol: sym
    });
  });

  // Shuffle array randomly
  return templates.sort(() => Math.random() - 0.5);
}

// Render financial news hub articles
function renderNews() {
  const newsGrid = document.getElementById('news-grid');
  if (!newsGrid) return;

  const newsList = generateDynamicNews(appState.tranches);

  if (newsList.length === 0) {
    newsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">Upload a CSV file to load personalized news.</div>`;
    return;
  }

  newsGrid.innerHTML = newsList.map(n => {
    const daysAgo = Math.floor(Math.random() * 3) + 1;
    return `
      <div class="news-card">
        <div class="news-meta">
          <span class="news-tag">${n.category}</span>
          <span>${daysAgo} days ago</span>
        </div>
        <h3 class="news-title">${n.title}</h3>
        <p class="news-desc">${n.desc}</p>
        <div class="news-footer">
          <span class="sentiment-pill ${n.sentiment}">
            <span class="dot"></span>${n.sentiment.toUpperCase()}
          </span>
          <a href="#" class="news-link" onclick="event.preventDefault(); alert('Redirecting to Broker Research Portal for ${n.symbol}...');">
            Research <i data-lucide="arrow-up-right" style="width: 14px; height: 14px;"></i>
          </a>
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

// Update choices in the simulator dropdown
function updateSimulatorDropdown() {
  const dropdown = document.getElementById('sim-target');
  if (!dropdown) return;

  // Add Market, Sectors, and Symbols
  let html = `<option value="market">Entire Market (Beta Weighted)</option>`;
  
  // Add unique sectors
  html += `<optgroup label="Sectors">`;
  Object.keys(appState.sectors).forEach(sec => {
    html += `<option value="sector-${sec}">${sec} Sector</option>`;
  });
  html += `</optgroup>`;

  // Add unique symbols
  html += `<optgroup label="Positions">`;
  appState.aggregated.forEach(g => {
    html += `<option value="symbol-${g.symbol}">${g.symbol} ($${g.currentValue.toLocaleString('en-US', {maximumFractionDigits: 0})})</option>`;
  });
  html += `</optgroup>`;

  dropdown.innerHTML = html;
}

// Hook up simulator slider updates
function setupSimulatorControls() {
  const target = document.getElementById('sim-target');
  const changeSlider = document.getElementById('sim-change-slider');
  const changeValue = document.getElementById('sim-change-val');

  if (!target || !changeSlider || !changeValue) return;

  // Sync slider and value label
  changeSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    changeValue.innerText = (val >= 0 ? '+' : '') + val + '%';
    runSimulation();
  });

  target.addEventListener('change', runSimulation);
}

// Core simulation algorithm
function runSimulation() {
  const target = document.getElementById('sim-target')?.value;
  const changePct = parseFloat(document.getElementById('sim-change-slider')?.value || '0');
  
  const simValEl = document.getElementById('sim-new-portfolio-val');
  const simPnlEl = document.getElementById('sim-pnl-impact');
  const simAlertsEl = document.getElementById('sim-triggered-stops');

  if (!simValEl || !simPnlEl || !simAlertsEl) return;

  let dollarImpact = 0;
  let stopsTriggered = 0;

  if (target === 'market') {
    // Beta-weighted market shift
    appState.tranches.forEach(t => {
      const positionBeta = t.beta || 1.0;
      const positionImpactPct = (changePct * positionBeta) / 100;
      const positionImpactDollar = t.currentSize * positionImpactPct;
      
      dollarImpact += positionImpactDollar;
      
      const newPrice = t.currentPrice * (1 + positionImpactPct);
      if (newPrice <= t.trailingStop) {
        stopsTriggered++;
      }
    });
  } else if (target.startsWith('sector-')) {
    // Sector specific shift
    const sectorName = target.replace('sector-', '');
    appState.tranches.forEach(t => {
      if (t.sector === sectorName) {
        const positionImpactDollar = t.currentSize * (changePct / 100);
        dollarImpact += positionImpactDollar;
        
        const newPrice = t.currentPrice * (1 + (changePct / 100));
        if (newPrice <= t.trailingStop) {
          stopsTriggered++;
        }
      }
    });
  } else if (target.startsWith('symbol-')) {
    // Symbol specific shift
    const symbol = target.replace('symbol-', '');
    appState.tranches.forEach(t => {
      if (t.symbol === symbol) {
        const positionImpactDollar = t.currentSize * (changePct / 100);
        dollarImpact += positionImpactDollar;
        
        const newPrice = t.currentPrice * (1 + (changePct / 100));
        if (newPrice <= t.trailingStop) {
          stopsTriggered++;
        }
      }
    });
  }

  const newPortfolioValue = appState.portfolioValue + dollarImpact;
  
  // Update HTML elements
  simValEl.innerText = `$${newPortfolioValue.toLocaleString('en-US', {maximumFractionDigits: 2})}`;
  
  const sign = dollarImpact >= 0 ? '+' : '';
  simPnlEl.className = `val ${dollarImpact >= 0 ? 'color-success' : 'color-danger'}`;
  simPnlEl.innerText = `${sign}$${dollarImpact.toLocaleString('en-US', {maximumFractionDigits: 2})} (${sign}${((dollarImpact / appState.portfolioValue) * 100).toFixed(2)}%)`;

  if (stopsTriggered > 0) {
    simAlertsEl.className = 'val color-danger';
    simAlertsEl.innerText = `${stopsTriggered} Positions Breached`;
  } else {
    simAlertsEl.className = 'val color-success';
    simAlertsEl.innerText = '0 Stops Triggered';
  }
}

// Live scrolling ticker price updates
function simulateTicker() {
  const keys = Object.keys(appState.tickerPrices);
  keys.forEach(k => {
    const p = appState.tickerPrices[k];
    const changePct = (Math.random() - 0.5) * 0.15; // small fluctuation
    p.price += p.price * (changePct / 100);
    p.pct += changePct;
    
    const tickerItem = document.getElementById(`ticker-${k}`);
    if (tickerItem) {
      const classColor = p.pct >= 0 ? 'color-success' : 'color-danger';
      const sign = p.pct >= 0 ? '+' : '';
      tickerItem.innerHTML = `
        <span class="ticker-symbol">${k}</span>
        <span class="ticker-price">$${p.price.toFixed(2)}</span>
        <span class="ticker-change ${classColor}">${sign}${p.pct.toFixed(2)}%</span>
      `;
    }
  });
}
