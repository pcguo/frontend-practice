

var $btnAdd = $('#btn-add');
var $list = $('#list-todo');
var $input = $('#new-todo');
var listState = [];



$btnAdd.on('click', function(){
	var value = $input.val();
	if(value==''){
		value='None'
	}
	$list.html($list.html() + '<li class="list-todo-li"><nobr class="listContent">' + value + '</nobr><button class="BtnRemove">删除</button><button class="BtnComplete">完成</button></li>');
	listState.push(0);
	$input.val("");
})

function selectDone(){
	optionVal = $("#select-done").val();
	if(optionVal == 0){
		listState.forEach(function(value, index) {
			$(".list-todo-li:eq("+index+")").show();
		});
	}
	else if(optionVal == 1){
		listState.forEach(function(value, index) {
			if(value){
				$(".list-todo-li:eq("+index+")").hide();
			}else{
				$(".list-todo-li:eq("+index+")").show();
			}
		});
	}else{
		listState.forEach(function(value, index) {
			if(value){
				$(".list-todo-li:eq("+index+")").show();
			}else{
				$(".list-todo-li:eq("+index+")").hide();
			}
		});
	}
};


$(document).on('click', '.BtnRemove', function(e){
	var listIndex = $(e.target).parent().index();
	listState.splice(listIndex, 1);
	$(e.target).parent().remove();
})

$(document).on('click', '.BtnComplete', function(e){
	var listIndex = $(e.target).parent().index();
	listState[listIndex] = 1 - listState[listIndex];
	console.log(listState);
	if(listState[listIndex] == 0){
		$(e.target).html("完成");
		$(e.target).parent().css('text-decoration', 'none');
	}else{
		$(e.target).html("取消完成");
		$(e.target).parent().css('text-decoration', 'line-through');
	}
	selectDone();
})
$(document).on('dblclick', '.listContent', function(e){
	var listIndex = $(e.target).parent().index();
	var content = $(e.target).html();
	console.log(content);
	$(e.target).html('<input id="content-tmp" type="text">');
	$("#content-tmp").focus();

	$("#content-tmp").val(content);
	if($("#content-tmp").val() == 'None'){
		$("#content-tmp").val('');
	}

	$("#content-tmp").blur(function(){
		content = $("#content-tmp").val();
		if(content == ''){
			content = 'None';
		}
		$("#content-tmp").parent().html(content);
	});
})
