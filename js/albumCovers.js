const panelSize = 800;

var helper = {
    doc: (id) => document.getElementById(id) || document.createElement("div"),
}

function startClicked() {

    const gridSize = document.getElementById('size').value;
    const table = document.getElementById('myTable');

 //   for (index = 0; index < gridSize*gridSize; index++) {
        //console.log(records[index], records[index].artist);
        var percentage = 100 / (gridSize - 1);
        // var row;
        // if (index % size == 0) {
        //     row = table.insertRow(table.length);
        // }
        
        // var cell = row.insertCell(index % size);
        //console.log("  offset is "+index % size);
        helper.doc('sortable').innerHTML = '';
        for (var i = 0; i < gridSize * gridSize; i++) {
            var xpos = (percentage * (i % gridSize)) + '%';
            var ypos = (percentage * Math.floor(i / gridSize)) + '%';
            var item = records[i];

            let li = document.createElement('li');
            li.id = i;
            li.setAttribute('data-value', i);
            li.style.backgroundImage = 'url(images/' + item.coverArt + ')';
            li.style.backgroundSize = '100%'; //(gridSize * 100) + '%';
            li.style.backgroundPosition = xpos + ' ' + ypos;
            li.style.width = panelSize / gridSize + 'px';
            li.style.height = panelSize / gridSize + 'px';

            li.setAttribute('draggable', 'true');


        //cell.innerHTML = "<img src=images/"+item.coverArt+" width=150px height=150px draggable=true alt="+item.artist+": "+item.title+">";
        li.ondragstart = (event) => {
            console.log("in ondragstart! "+ event.target.id);
            event.dataTransfer.setData('data', event.target.id);
        }
        li.ondragover = (event) => event.preventDefault();
        li.ondrop = (event) => {
            console.log("in ondrop! "+ event.target.id);

            let origin = helper.doc(event.dataTransfer.getData('data'));
            let dest = helper.doc(event.target.id);
            let p = dest.parentNode;

            if (origin && dest && p) {
                let temp = dest.nextSibling;
                let x_diff = origin.offsetLeft-dest.offsetLeft;
                let y_diff = origin.offsetTop-dest.offsetTop;

                if (y_diff == 0 && x_diff >0) {
                    //LEFT SWAP
                    console.log('left swap! ', origin, dest);
                    p.insertBefore(origin, dest);
                    p.insertBefore(temp, origin);
                }
                else{
                    console.log('right swap! ', origin, dest);
                    p.insertBefore(dest, origin);
                    p.insertBefore(origin, temp);
                }

            }
        };
        li.setAttribute('dragstart', 'true');
        helper.doc('sortable').appendChild(li);
    }
}