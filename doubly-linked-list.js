
n DoublyLinked(){
    this.head = null;
    }

    DoublyLinked.prototype.add = function(val){

        var node = {
	        val: val,
		        next: null,
			        prev: null
				    }

				        if(!this.head){
					        this.head = node;
						        return node;
							    }

							        var current = this.head;

								    while(current.next){
								            current = current.next;
									        }

										    node.prev = current;
										        current.next = node;
											    return node;
											    }


