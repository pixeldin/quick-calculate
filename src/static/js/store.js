var subList = [{
		"head": "20以内加减（补数法）",
		"desc": "把其中一个数分解成两个数，分解的其中一个数和另一个数相加等于10",
		"type": "20-cut",
		"opts": generate20Cut(),
		"rule": []
	}, {
		"head": "两位数个位和十位是镜像的两个数",
		"desc": "互为镜像的两位数相当于任意的一个数字个位+十位的和乘11",
		"type": "mirror-plus",
		"opts": generateMirrorPlus(),
		"rule": []
	},
	{
		"head": "整100数-任意数",
		"desc": "用9-十位数 10-个位数",
		"type": "100-cut",
		"opts": generate100Cut(),
		"rule": []
	},
	{
		"head": "尾数为5的两位数平方",
		"desc": "结尾是25，前面两个数是原来数十位x（十位数+1）",
		"type": "5-square",
		"opts": generate5Square(),
		"rule": []
	},
	{
		"head": "两位数x11",
		"desc": "首位两个数字分别是乘数的十位和个位，中间的数字是乘数的和",
		"type": "double-mult-11",
		"opts": generateDoubleMult11(),
		"rule": []
	},
	{
		"head": "90～100两位数乘",
		"desc": "先找出两个数分别和100差多少，最后两位就是这两个数和100的差值相乘，前面两位是这个差值相加，再用100-差值的和",
		"type": "90s-mult-90s",
		"opts": generate90sMult90s(),
		"rule": []
	},
	{
		"head": "个位相同，十位➕等于10",
		"desc": "末尾两个数是个位相乘（如果末尾两个数字小于10要补一个0成为4位数），前面两位是两个数字的十位数相乘再加上个位",
		"type": "foo-10-bar",
		"opts": generateFoo10Bar(),
		"rule": []
	},
	{
		"head": "十位相同，个位➕等于10",
		"desc": "末尾两个数是个位相乘（如果末尾两个数字小于10要补一个0成为4位数），前面两个数是十位x（十位数+1）",
		"type": "foo-bar-10",
		"opts": generateFooBar10(),
		"rule": []
	},
	// {
	// 	"head": "20以内两位数相乘（两数个位之和≤10）",
	// 	"desc": "末尾两个数个位相乘，前面两个数是任意一个数的个位+另外一个数",
	// 	"type": "20-foo-lte10",
	// 	"opts": generate20FooLte10()
	// },
	// {
	// 	"head": "20以内两位数相乘（两数个位之和＞10）",
	// 	"desc": "末尾两个数个位相乘，前面两个数是任意一个数的个位+另外一个数，因为相加大于10，所以把相加后的数个位加到末尾两个数的十位上",
	// 	"type": "20-foo-gt10",
	// 	"opts": generate20FooGt10()
	// },
	{
		"head": "100-110内的数相乘",
		"desc": "末尾两个数个位相乘，前面两个数是任意一个数的个位数加另一个数",
		"type": "100-m-110",
		"opts": generate100M110(),
		"rule": []
	},
	{
		"head": "整十数 ÷ 5",
		"desc": "去末尾0乘2",
		"type": "10s-d-5",
		"opts": generate10sD5(),
		"rule": []
	},
	{
		"head": "任意数 X 5",
		"desc": "前数÷2x10",
		"type": "any-m-5",
		"opts": generateAnyMult5(),
		"rule": []
	},
	{
		"head": "任意数 X 25",
		"desc": "前数÷4x100",
		"type": "any-m-25",
		"opts": generateAnyMult25(),
		"rule": []
	},
	{
		"head": "任意数 X 125",
		"desc": "前数÷8x1000",
		"type": "any-m-125",
		"opts": generateAnyMult125(),
		"rule": []
	}
]

var setting = {
	// 时长min
	"duration": -1,
	// 题目类型
	"type": [],
	"subNumber": 0
}

// 生成题库
// 根据 type 为 "20-cut" 生成字符串数组的组合
function generate20Cut() {
	let combinations = [];
	for (let i = 11; i <= 19; i++) {
		for (let j = 1; j <= 9; j++) {
			if (i !== 10 && (j !== 10 || i !== 10 + j)) {
				let sum = i + j;
				let combination = i + " + " + j + " = " + sum;
				combinations.push(combination);
			}
		}
	}
	return combinations;
}

function generate20CutRule() {
	var obj = subList.find(function(item) {
		return item.type === "20-cut";
	});

	// 初始化20Cut的 rule 数组
	var ruleArr = [];

	// 遍历 opts 数组的元素，进行分解并生成对应的 rule 字符串
	for (var i = 0; i < obj.opts.length; i++) {
		var opt = obj.opts[i];
		var parts = opt.split("=");
		var leftPart = parts[0].trim();
		var rightPart = parts[1].trim();

		// 提取两个数
		var num1 = parseInt(leftPart.split("+")[0].trim());
		var num2 = parseInt(leftPart.split("+")[1].trim());

		// 计算另一个数
		var anotherNum = 10 - num2;
		var temp = num1 - anotherNum;
		// 生成规则字符串
		var ruleString = `${temp} + (${anotherNum}+${num2}) = ${rightPart}`;

		// 将规则字符串添加到 rule 数组中
		ruleArr.push(ruleString);
	}

	// 将生成的 rule 数组赋值给 obj 的 rule 字段
	obj.rule = ruleArr;
}

// 根据 type 为 "mirror-plus" 生成字符串数组的组合
function generateMirrorPlus() {
	let combinations = [];
	for (let i = 10; i <= 99; i++) {
		let unit = i % 10;
		let ten = Math.floor(i / 10);

		let mirroredNumber = unit * 10 + ten;

		if (mirroredNumber >= 10 && mirroredNumber <= 99) {
			let sum = i + mirroredNumber;
			let combination = i + " + " + mirroredNumber + " = " + sum;
			combinations.push(combination);
		}
	}
	return combinations;
}

function generateMirrorPlusRule() {
	var obj = subList.find(function(item) {
		return item.type === "mirror-plus";
	});

	// 初始化空数组来存储拆解后的规则
	var ruleArr = [];

	// 遍历opts中的每个元素，进行拆解并添加到ruleArr中
	for (var i = 0; i < obj.opts.length; i++) {
		var equation = obj.opts[i];
		var operands = equation.split(" + ");
		var operand1 = operands[0];
		// var operand2 = operands[1];
		var s1 = parseInt(operand1.charAt(0))
		var s2 = parseInt(operand1.charAt(1));
		var sum = s1 + s2;
		var rule = "(" + s1 + " + " + s2 + ") x 11 = " + (sum * 11);
		ruleArr.push(rule);
	}

	// 将生成的规则数组赋值给对象的"rule"字段
	obj.rule = ruleArr;
}

// 根据 type 为 "100-cut" 生成字符串数组的组合
function generate100Cut() {
	const combinations = [];
	for (var i = 11; i <= 99; i++) {
		var result = 100 - i;
		combinations.push("100 - " + i + " = " + result);
	}
	return combinations;
}

function generate100CutRule() {
	var obj = subList.find(function(item) {
		return item.type === "100-cut";
	});

	// 初始化空数组来存储拆解后的规则
	var ruleArr = [];
	for (var i = 0; i < obj.opts.length; i++) {
		var equation = obj.opts[i];
		var operands = equation.split(" - ");
		var operand0 = operands[0];
		var operand1 = operands[1];
		var base = parseInt(operand0)
		var s1 = parseInt(operand1.charAt(0));
		var s2 = parseInt(operand1.charAt(1));
		var rule = "(9-" + s1 + ")(10-" + s2 + ") = " + (base - (s1 * 10 + s2));
		ruleArr.push(rule);
	}

	// 将生成的规则数组赋值给对象的"rule"字段
	obj.rule = ruleArr;
}

// 尾数为5的两位数平方
function generate5Square() {
	let mults = [];
	for (let i = 10; i <= 99; i++) {
		let unit = i % 10;
		if (unit === 5) {
			let result = i * i;
			let combination = i + " x " + i + " = " + result;
			mults.push(combination);
		}
	}
	return mults;
}
// "desc": "结尾是25，前面两个数是原来数十位x（十位数+1）", "25 x 25 = 625"
function generate5SquareRule() {
	var obj = subList.find(function(item) {
		return item.type === "5-square";
	});

	// 初始化空数组来存储拆解后的规则
	var ruleArr = [];
	for (var i = 0; i < obj.opts.length; i++) {
		var equation = obj.opts[i];
		var operands = equation.split(" x ");
		var operand0 = operands[0];
		var base = parseInt(operand0)
		var operand1 = operands[1];
		var s1 = parseInt(operand1.charAt(0));
		var s2 = s1 + 1;
		var rule = "(" + s1 + " x " + s2 + ")(25) = " + (base * base);
		ruleArr.push(rule);
	}
	// 将生成的规则数组赋值给对象的"rule"字段
	obj.rule = ruleArr;
}

// 两位数x11
function generateDoubleMult11() {
	let mults = [];
	for (let i = 11; i <= 99; i++) {
		let j = 11;
		let result = i * j;
		let combination = i + " x " + j + " = " + result;
		mults.push(combination);
	}
	return mults;
}

function generateDoubleMult11Rule() {
	var obj = subList.find(function(item) {
		return item.type === "double-mult-11";
	});

	// 初始化空数组来存储拆解后的规则
	var ruleArr = [];
	for (var i = 0; i < obj.opts.length; i++) {
		var equation = obj.opts[i];
		var operands = equation.split(" x ");
		var operand0 = operands[0];
		var base = parseInt(operand0)
		var s1 = parseInt(operand0.charAt(0));
		var s2 = parseInt(operand0.charAt(1));
		var rule = s1 + "(" + s1 + " + " + s2 + ")" + s2 + " = " + (base * 11);
		ruleArr.push(rule);
	}
	// 将生成的规则数组赋值给对象的"rule"字段
	obj.rule = ruleArr;
}

// 90～100两位数乘	
function generate90sMult90s() {
	let combinations = [];
	for (let i = 91; i <= 99; i++) {
		for (let j = i; j <= 99; j++) {
			let result = i * j;
			let combination = i + " x " + j + " = " + result;
			combinations.push(combination);
		}
	}
	return combinations;
}

function generate90sMult90sRule() {
	var obj = subList.find(function(item) {
		return item.type === "90s-mult-90s";
	});

	// 初始化空数组来存储拆解后的规则
	var ruleArr = [];

	for (var i = 0; i < obj.opts.length; i++) {
		var equation = obj.opts[i];
		var result = equation.split("=")[1].trim();

		var operands = equation.split(" x ");
		var operand0 = operands[0];
		var s01 = parseInt(operand0.charAt(0));
		var s02 = parseInt(operand0.charAt(1));
		var b1 = s01 * 10 + s02;

		var operand1 = operands[1];
		var s11 = parseInt(operand1.charAt(0));
		var s12 = parseInt(operand1.charAt(1));
		var b2 = s11 * 10 + s12;

		var rule = " 100-【(100-" + b1 + ") + " + "(100-" + b2 + ")】" + "(100-" + b1 + ") x（100- " + b2 + ") = " +
			result;
		ruleArr.push(rule);
	}

	// 将生成的规则数组赋值给对象的"rule"字段
	obj.rule = ruleArr;
}

// 个位相同，十位相加等于10
function generateFoo10Bar() {
	let combinations = [];
	for (let i = 10; i <= 99; i++) {
		let ten = Math.floor(i / 10);
		let unit = i % 10;

		for (let j = i; j <= 99; j++) {
			let ten2 = Math.floor(j / 10);
			let unit2 = j % 10;

			if (unit === unit2 && ten + ten2 === 10) {
				let result = i * j;
				let combination = i + " x " + j + " = " + result;
				combinations.push(combination);
			}
		}
	}
	return combinations;
}

function generateFoo10BarRule() {
	var obj = subList.find(function(item) {
		return item.type === "foo-10-bar";
	});

	// 初始化空数组来存储拆解后的规则
	var ruleArr = [];

	for (var i = 0; i < obj.opts.length; i++) {
		var equation = obj.opts[i];
		var result = equation.split("=")[1].trim();

		var operands = equation.split(" x ");
		var operand0 = operands[0];
		var s01 = parseInt(operand0.charAt(0));

		var operand1 = operands[1];
		var s11 = parseInt(operand1.charAt(0));
		var s12 = parseInt(operand1.charAt(1));

		var rule = "(" + s01 + "x" + s11 + "+" + s12 + ") " + "(" + s12 + "x" + s12 + ") = " +
			result;
		ruleArr.push(rule);
	}

	// 将生成的规则数组赋值给对象的"rule"字段
	obj.rule = ruleArr;
}

// 十位相同，个位相加等于10
function generateFooBar10() {
	let mpt = [];
	for (let i = 12; i <= 99; i++) {
		let ten = Math.floor(i / 10);
		let unit = i % 10;

		for (let j = i; j <= 98; j++) {
			let ten2 = Math.floor(j / 10);
			let unit2 = j % 10;

			if (ten === ten2 && unit + unit2 === 10) {
				let result = i * j;
				let combination = i + " x " + j + " = " + result;
				mpt.push(combination);
			}
		}
	}
	return mpt;
}

function generateFooBar10Rule() {
	var obj = subList.find(function(item) {
		return item.type === "foo-bar-10";
	});

	// 初始化空数组来存储拆解后的规则
	var ruleArr = [];

	for (var i = 0; i < obj.opts.length; i++) {
		var equation = obj.opts[i];
		var result = equation.split("=")[1].trim();

		var operands = equation.split(" x ");
		var operand0 = operands[0];
		var s01 = parseInt(operand0.charAt(1));

		var operand1 = operands[1];
		var s11 = parseInt(operand1.charAt(0));
		var s12 = parseInt(operand1.charAt(1));

		var rule = "【" + s11 + "x (" + s11 + "+1)】（" + s01 + "x" + s12 + ") = " +
			result;
		ruleArr.push(rule);
	}

	// 将生成的规则数组赋值给对象的"rule"字段
	obj.rule = ruleArr;
}
// 不知所云
function generate20FooLte10() {
	return [];
}

// 说人话?
function generate20FooGt10() {
	return [];
}

// 100-110内的数相乘
function generate100M110() {
	const multiplications = [];
	for (let i = 101; i <= 109; i++) {
		for (let j = 101; j <= 109; j++) {
			const product = i * j;
			multiplications.push(`${i} x ${j} = ${product}`);
		}
	}
	return multiplications;
}

function generate100M110Rule() {
	var obj = subList.find(function(item) {
		return item.type === "100-m-110";
	});

	// 初始化空数组来存储拆解后的规则
	var ruleArr = [];

	for (var i = 0; i < obj.opts.length; i++) {
		var equation = obj.opts[i];
		var result = equation.split("=")[1].trim();

		var operands = equation.split(" x ");
		var operand0 = operands[0];
		var s0 = parseInt(operand0);
		var s01 = parseInt(operand0.charAt(2));


		var operand1 = operands[1];
		var s12 = parseInt(operand1.charAt(2));

		var rule = "(" + s01 + "+" + s0 + ")(" + s01 + "x" + s12 + ") = " +
			result;
		ruleArr.push(rule);
	}

	// 将生成的规则数组赋值给对象的"rule"字段
	obj.rule = ruleArr;
}

// 整十数÷5
function generate10sD5() {
	let combinations = [];

	for (let i = 10; i <= 500; i += 10) {
		let result = i / 5;
		let combination = i + " ÷ 5 = " + result;
		combinations.push(combination);
	}
	return combinations;
}

function generate10sD5Rule() {
	var obj = subList.find(function(item) {
		return item.type === "10s-d-5";
	});

	// 初始化空数组来存储拆解后的规则
	var ruleArr = [];

	for (var i = 0; i < obj.opts.length; i++) {
		var equation = obj.opts[i];
		var result = equation.split("=")[1].trim();

		var operands = equation.split(" ÷ ");
		var operand0 = operands[0];
		var s0 = parseInt(operand0) / 10;
		var rule = "(" + s0 + "x" + "2) =" +
			result;
		ruleArr.push(rule);
	}
	// 将生成的规则数组赋值给对象的"rule"字段
	obj.rule = ruleArr;
}

// 任意数x5	
function generateAnyMult5() {
	let combinations = [];

	for (let i = 2; i <= 98; i += 2) {
		let result = i * 5;
		let combination = i + " x 5 = " + result;
		combinations.push(combination);
	}
	return combinations;
}

function generateAnyMult5Rule() {
	var obj = subList.find(function(item) {
		return item.type === "any-m-5";
	});
	// 初始化空数组来存储拆解后的规则
	var ruleArr = [];

	for (var i = 0; i < obj.opts.length; i++) {
		var equation = obj.opts[i];
		var result = equation.split("=")[1].trim();

		var operands = equation.split(" x ");
		var operand0 = operands[0];
		var s0 = parseInt(operand0);
		var rule = "(" + s0 + "÷2) x" + "10) =" +
			result;
		ruleArr.push(rule);
	}
	// 将生成的规则数组赋值给对象的"rule"字段	
	obj.rule = ruleArr;
}

// 任意数x25	
function generateAnyMult25() {
	let combinations = [];

	for (let i = 4; i <= 99; i += 4) {
		let result = i * 25;
		let combination = i + " x 25 = " + result;
		combinations.push(combination);
	}
	return combinations;
}

function generateAnyMult25Rule() {
	var obj = subList.find(function(item) {
		return item.type === "any-m-25";
	});
	// 初始化空数组来存储拆解后的规则
	var ruleArr = [];

	for (var i = 0; i < obj.opts.length; i++) {
		var equation = obj.opts[i];
		var result = equation.split("=")[1].trim();

		var operands = equation.split(" x ");
		var operand0 = operands[0];
		var s0 = parseInt(operand0);
		var rule = "(" + s0 + "÷4) x" + "100) =" +
			result;
		ruleArr.push(rule);
	}
	// 将生成的规则数组赋值给对象的"rule"字段	
	obj.rule = ruleArr;
}

// 任意数x125	
function generateAnyMult125() {
	let combinations = [];

	for (let i = 8; i <= 88; i += 8) {
		let result = i * 125;
		let combination = i + " x 125 = " + result;
		combinations.push(combination);
	}
	return combinations;
}

function generateAnyMult125Rule() {
	var obj = subList.find(function(item) {
		return item.type === "any-m-125";
	});

	// 初始化空数组来存储拆解后的规则
	var ruleArr = [];

	for (var i = 0; i < obj.opts.length; i++) {
		var equation = obj.opts[i];
		var result = equation.split("=")[1].trim();

		var operands = equation.split(" x ");
		var operand0 = operands[0];
		var s0 = parseInt(operand0);
		var rule = "(" + s0 + "÷8) x" + "1000) =" +
			result;
		ruleArr.push(rule);
	}
	// 将生成的规则数组赋值给对象的"rule"字段
	obj.rule = ruleArr;
}

// 提取公式组成数字与结果
function extractNumbers(expression) {
	var pattern = /^(\d+)\D+(\d+)\D+(\d+)$/;
	var matches = expression.match(pattern);

	if (matches) {
		return [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])];
	} else {
		return [];
	}
}

// 随机根据type生成指定数量题目
function getRandomQuestions() {
	let subNumber = setting.subNumber;
	let type = setting.type;
	const subListCopy = JSON.parse(JSON.stringify(subList));
	const opts = [];
	const selectedIndexes = type.filter(index => index < subListCopy.length);

	for (let i = 0; i < subNumber && opts.length < subNumber; i++) {
		const typeIndex = i % selectedIndexes.length;
		const subIndex = selectedIndexes[typeIndex];

		if (subIndex !== undefined) {
			const subItem = subListCopy[subIndex];

			if (subItem && subItem.opts && subItem.opts.length > 0) {
				const opt = subItem.opts.shift();
				let rule;
				if (subItem && subItem.rule && subItem.rule.length > 0) {
					rule = subItem.rule.shift();
				} else {
					// 在subItem.rule不存在或为空数组时处理
					rule = "规则不可用，请动用你的脑筋想想为什么！";
				}
				// console.log('当前type: ', subItem.type, 'push opt: ', opt);
				const newOpt = {
					head: subItem.head,
					opt: opt,
					desc: subItem.desc,
					rule: rule,
					type: subItem.type,

				};
				opts.push(newOpt);
			}
		}
	}

	return opts;
}

// 辅助函数：从数组中删除指定元素
function removeElement(arr, element) {
	var index = arr.indexOf(element);
	if (index > -1) {
		arr.splice(index, 1);
	}
}

function updateSetting(newSetting) {
	Object.assign(setting, newSetting);
}

function loadDebugSetting() {
	setting.duration = 10
	setting.subNumber = 61
	setting.type = [0, 3, 12]
}

// 初始化所有类型公式提示
function initSubRule() {
	generate20CutRule();
	generateMirrorPlusRule();
	generate100CutRule();
	generate5SquareRule();
	generateDoubleMult11Rule();
	generate90sMult90sRule();
	generateFoo10BarRule();
	generateFooBar10Rule();
	generate100M110Rule();
	generate10sD5Rule();
	generateAnyMult5Rule();
	generateAnyMult25Rule();
	generateAnyMult125Rule();
}


export default {
	subList,
	setting,
	updateSetting,
	extractNumbers,
	getRandomQuestions,
	loadDebugSetting,
	initSubRule
}