describe("awesomplete", function () {
	var awesompleter;
	var dummyInput;

	beforeEach(function () {
		var dummyBody = document.createElement("body");
		dummyInput = document.createElement("input");
		dummyBody.appendChild(dummyInput);
		awesompleter = new Awesomplete(dummyInput);
	});

	describe("default object", function () {
		it("should have an input", function(){
			expect(awesompleter.input).not.toBeNull();
		});

		it("should have autocomplete off", function () {
			expect(awesompleter.input.attributes.autocomplete.value).toBe("off");
		});

		it("should have an empty list", function () {
			expect(awesompleter._list.length).toBe(0);
		});

		it("should have 2 min chars", function () {
			expect(awesompleter.minChars).toBe(2);
		});

		it("should have 10 max items", function () {
			expect(awesompleter.maxItems).toBe(10);
		});

		it("should filter with FILTER_CONTAINS", function () {
			expect(awesompleter.filter).toBe(Awesomplete.FILTER_CONTAINS);
		});

		it("should order with SORT_BYLENGTH", function () {
			expect(awesompleter.sort).toBe(Awesomplete.SORT_BYLENGTH);
		});

		it("should not select the first ocurrence automatically" , function () {
			expect(awesompleter.autoFirst).toBe(false);
		});
	});

	describe("custom object", function () {
		it("should have a non-empty list", function () {
			awesompleter.list = ["Prolog"];
			expect(awesompleter._list.length).toBe(1);
		});

		it("sets correct list when array is passed", function () {
			awesompleter.list = ["java & LOLcode"];
			expect(awesompleter._list[0]).toBe("java & LOLcode");
		});

		xit("sets correct list when element is passed", function () {
			var item = document.createElement("li");
			item.textContent = ">:&";

			var newList = document.createElement("ul");
			newList.appendChild(item);

			spyOn(Awesomplete,'$').and.returnValue(newList);
			awesompleter.list = "#listSelector";
			expect(awesompleter._list[0]).toBe(">:&");
		});

		it("should have 3 min chars", function () {
			awesompleter = new Awesomplete(dummyInput,{minChars:3});
			expect(awesompleter.minChars).toBe(3);
		});
	});
});

describe("awesomplete helpers", function () {
	describe("$ function", function () {
		it("should return null when is called without input", function () {
			var nullSelector = Awesomplete.$();
			expect(nullSelector).toBe(null);
		});

		it("should escape regular expression tokens", function () {
			var stringWithTokens = "[^j(a)v?a-sc|ri\\p+t*]";
			var escapeString = Awesomplete.$.regExpEscape(stringWithTokens);
			expect(escapeString).toBe("\\[\\^j\\(a\\)v\\?a\\-sc\\|ri\\\\p\\+t\\*\\]");
		});
	});

	describe("$ function spy", function () {
		beforeEach(function () {
			spyOn(Awesomplete,"$");
			Awesomplete.$(null);
		});

		it("should call the query selector function", function () {
			expect(Awesomplete.$).toHaveBeenCalled();
		});

		it("should have been called with null when called with no args", function () {
			expect(Awesomplete.$).toHaveBeenCalledWith(null);
		});
	});
});

describe("awesomplete static methods", function () {
	describe("filter contains", function () {
		it("matches a word anywhere", function () {
			var match = Awesomplete.FILTER_CONTAINS("java", "ava");
			expect(match).toBe(true);

			match = Awesomplete.FILTER_CONTAINS("AT&T", "&T");
			expect(match).toBe(true);

			match = Awesomplete.FILTER_CONTAINS("[^j(a)v?a-", "v?a");
			expect(match).toBe(true);

			match = Awesomplete.FILTER_CONTAINS("[^j(a)v?a-","ava");
			expect(match).toBe(false);
		});
		it("is case insensitive", function () {
			var match = Awesomplete.FILTER_CONTAINS("java", "AVA");
			expect(match).toBe(true);
		});
	});
});
