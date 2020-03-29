const dbg = document.getElementById('debug');
const mindmap = document.getElementById('mindmap');

window.addEventListener('message', event => {
	const message = event.data;
	switch (message.command) {
		case 'mindmap':
			dbg.textContent = message.data;
			var data = {
			    "name": "A",
			    "children": [
			      { "name": "B" },
			      {
			        "name": "C",
			        "children": [{ "name": "D" }, { "name": "E" }, { "name": "F" }]
			      },
			      { "name": "G" },
			      {
			        "name": "H",
			        "children": [{ "name": "I" }, { "name": "J" }]
			      },
			      { "name": "K" }
			    ]
			};
			viewMindMap(data);
			break;
	}
});

function viewMindMap(rawData) {
	var width = document.querySelector("svg").clientWidth;
	var height = document.querySelector("svg").clientHeight;
	var data = {};

	var traverse = function(data) {
		for (var elem in data) {
		// if (o[i] !== null && typeof(o[i]) === "object") {
		//      d = traverse(o[i], fn);
		//    }
		}
	};

	traverse(rawData, function(k,v){
		return {"name": k};
	});

	// 3. 描画用のデータ変換
	root = d3.hierarchy(data);

	var tree = d3.tree()
	  .size([height, width - 160]);
	  //  .nodeSize([50,300]) ;
	  //  .separation(function(a, b) { return(a.parent == b.parent ? 1 : 2); });

	tree(root);

	// 4. svg要素の配置
	g = d3.select("svg").append("g").attr("transform", "translate(80,0)");
	var link = g.selectAll(".link")
	  .data(root.descendants().slice(1))
	  .enter()
	  .append("path")
	  .attr("class", "link")
	  .attr("d", function(d) {
		return "M" + d.y + "," + d.x +
		  "C" + (d.parent.y + 100) + "," + d.x +
		  " " + (d.parent.y + 100) + "," + d.parent.x +
		  " " + d.parent.y + "," + d.parent.x;
	  });

	var node = g.selectAll(".node")
	  .data(root.descendants())
	  .enter()
	  .append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

	node.append("circle")
	  .attr("r", 8)
	  .attr("fill", "#999");

	node.append("text")
	  .attr("dy", 3)
	  .attr("x", function(d) { return d.children ? -12 : 12; })
	  .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
	  .attr("font-size", "200%")
	  .text(function(d) { return d.data.name; });
}