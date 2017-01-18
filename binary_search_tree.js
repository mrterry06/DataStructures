function BinarySearchTree(){
	this.root = null;

}


BinarySearchTree.prototype.add = function(val){
	var node = {
		val: val,
		right: null,
		left: null
	}

	if(!this.root){
		this.root = node;
		return node;
	}

	function assign_node(root){
		var side = "right";
		if (val <= root.val) side = "left"; 
		
		if(!root[side]){
			root[side] = node;
			return node;
		}else{
			return assign_node(root[side]);
		}
	}

 return	assign_node(this.root);

}

