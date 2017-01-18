var CircularLinked = function(){
    this.head = null;
}


CircularLinked.prototype.add = function(value){

	var node = {
		
		val: value,
		next: this.head,
		prev: null
	}

	if(!this.head){
		this.head = node;
		return node;
	}

	if(!this.head.next){
		node.prev = this.head;
		this.head.next = node;
		return node;
	}

	var prev = this.head, current = this.head.next;

	while(current.next && current.prev){
		prev = current;
		current = current.next;
	}

	node.prev = prev;
	prev.next = node;

	return node;

}

