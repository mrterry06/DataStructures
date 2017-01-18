var SinglyLinked = function(){
    this.head = null;
    }


    SinglyLinked.prototype.add = function(value){

        var node = {
	        val: value,
		        next: null
			    }

			        if(!this.head){
				        this.head = node;
					        return node;
						    }

						        var current = this.head;

							    while(current.next){
							            current = current.next;
								        }

									    current.next = node;

									        return node;

										}
