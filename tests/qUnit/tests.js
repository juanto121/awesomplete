QUnit.module("Awesomeplete",{
	beforeEach: function(){
		var dummyBody = document.createElement('body');
		var dummyInput = document.createElement('input');
		dummyBody.appendChild(dummyInput);
		
		this.dummyInput = dummyInput;
		this.awesompleter = new Awesomplete(dummyInput);
	}
});

QUnit.test("Creates an Awesomplete",function(assert){
	assert.ok(this.awesompleter, "awesompleter ok");
});

QUnit.test("Creates an Awesomplete with empty list",function(assert){
	assert.equal(this.awesompleter._list.length, 0);
});

QUnit.test("Creates an Awesomplete with 2 min chars",function(assert){
	assert.equal(this.awesompleter.minChars, 2);
});

QUnit.test("Creates an Awesomplete with 10 max items",function(assert){
	assert.equal(this.awesompleter.maxItems, 10);
});

QUnit.test("Adds an element to the list",function(assert){
	this.awesompleter.list = ["Prolog"];
	assert.equal(this.awesompleter._list.length, 1);
});

QUnit.test("Creates Awesomplete with 3 min chars",function(assert){
	awesomplete = new Awesomplete(this.dummyInput,{minChars:3});
	assert.equal(awesomplete.minChars, 3);
});




