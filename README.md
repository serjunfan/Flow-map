# Flow-map for my Teamwork project.

Only 2020's data were graphed. 

Only countries between countries immigrants flow were graphed.

Some immigrants data were .. which were ignored.

圖名:World Immigrants flow map
圖例說明:透過點擊世界地圖上的國家區域，來觀看從此國家流出到其他國家的流向，底下是10個流出數量最多國家的Bar chart
簡要說明:移民圖表最好還是能夠繪製在世界地圖上面，但就會面臨資料量重疊的問題，原本打算實作OD data smoothing algorithm 但時間上有點困難，最後選擇改用
edge bundling在解決問題。至於實際資料的顯示可以透過Tooltip來表示，但太過繁瑣且依賴互動，所以改用multiview ，在底下加上數字最高10個國家bar chart.

Learn React and D3.js mainly from: https://www.youtube.com/watch?v=2LhoCfjm8R4

Bundle Algorithm from https://github.com/upphiminn/d3.ForceBundle

![image](https://github.com/serjunfan/Flow-map/blob/main/Map1.jpg)
