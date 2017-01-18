var reverseList = function(head) {

var current = head, present = null, prev = null;

	while(current.next){
		prev = present;
		present = current;
		current = current.next;
		present.next = prev;
	}

	current.next = present;
	head = current;
	return head;


};
