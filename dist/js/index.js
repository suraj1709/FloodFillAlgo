var matrix;
var queue;
var isVisted;
var l;
var m;
var row;
var col;
var output = document.getElementById("matrix_length"); 
selectedColor=()=>
{
var selectedColor = document.getElementById("favcolor").value;
return selectedColor;
console.log(selectedColor)
}
 Clear=()=>
{
    var table=document.getElementById('Table')
    table.remove()
    generateMatrix()
    var button=document.querySelector('button')
}
changeColor=(colNum,colorChange)=>
{
    var columnName=document.querySelector('.'+colNum)
    columnName.style.backgroundColor=colorChange

}
 generateMatrix=()=>
{
    matrix=[...Array(10)].map(x=>Array(10).fill('white')) 
    isVisted=[...Array(10)].map(x=>Array(10).fill(false)) 
    queue=[]

    color=['blue','green','red','violet']
    var button=document.querySelector('button')
    button.remove()
    var table=document.getElementById('Table')
    table.style.display='table'
    table.style.alignItems='center'
for(let i=0;i<10;i++)
{
    var row=document.createElement("div")
    row.className="row"+i
    row.style.display='table-row'
    table.appendChild(row)
    for(let j=0;j<10;j++)
    {
        var col=document.createElement("div")
        var newContent = document.createTextNode(""); 
        var random=Math.floor(Math.random()*4)
        
        //CSS part for dynamic color
        col.className="col"+i+j
        col.style.display='table-cell'
        col.style.border='solid'
        col.style.borderWidth='thin';
        col.style.width='30px'
        col.style.height='30px'
        col.style.backgroundColor=color[random]
        matrix[i][j]=color[random]
        col.style.paddingLeft='5px' 
        col.style.paddingRight='5px' 
        col.appendChild(newContent)
        row.appendChild(col)  
    }
}
document.addEventListener('click', function(e) {
    e = e || window.event;
    if(e.path[0].className.includes('col'))
    {
        
        bfs(e.path[0].style.backgroundColor,e.path[0].className,selectedColor())
    }

}, false);

}

//BFS to traverse to the whole matrix

bfs=(selectColor,clickedPosition,selectedColor)=>
{
    var pos=Array.from(clickedPosition.substr(3,4))
    queue.push(parseInt(pos[0]))
    queue.push(parseInt(pos[1]))
    while(queue.length!=0)
    {
        
        l=queue.shift()
        m=queue.shift()
        if(isVisted[l][m]===true)
        {
            continue
        }
        if(matrix[l][m]!==selectColor)
        {
            continue
        }
        matrix[l][m]=selectedColor
        isVisted[l][m]=true
        changeColor('col'+l+m,selectedColor)
        findAdjacentElement(l,m)
    }
    
}
//Helper function to find adjacent
findAdjacentElement=(l,m)=>
{
    
    if(l-1>=0 && !isVisted[l-1][m])
    {
        queue.push(l-1)
        queue.push(m)
    }
    if(l+1<10 && !isVisted[l+1][m])
    {
        queue.push(l+1)
        queue.push(m)
    }
    if(m-1>=0 && !isVisted[l][m-1])
    {
        queue.push(l)
        queue.push(m-1)
    }
    if(m+1<10 && !isVisted[l][m+1])
    {
        queue.push(l)
        queue.push(m+1)
    }
}
