const dbg = document.getElementById('debug');
const mindmap = document.getElementById('mindmap');

window.addEventListener('message', event => {
	const message = event.data;
	switch (message.command) {
		case 'mindmap':
			dbg.textContent = message.data;
			var data = {
			    "name": "Top",
			    "children": JSON.parse(message.data)
			};
			viewMindMap(data);
			break;
	}
});

function viewMindMap(data) {
	var width = document.querySelector("svg").clientWidth;
	var height = document.querySelector("svg").clientHeight;

	// 3. 描画用のデータ変換
	root = d3.hierarchy(data);

	var tree = d3.tree()
	  .size([height, width - 160]);
	  //  .nodeSize([50,300]) ;
	  //  .separation(function(a, b) { return(a.parent == b.parent ? 1 : 2); });

	tree(root);

	// 初期化
	d3.select("svg > g").remove();

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