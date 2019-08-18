@/*
    名称查询条件标签的参数说明:

    name : 查询条件的名称
    id : 查询内容的input框id
    type: 输入框类型：text,number
@*/
<div class="input-group">
    <div class="fg-line">
    <input
            @if(isNotEmpty(type)){
            type="${type}"
            @}else{
            type="text"
            @}

            class="form-control" id="${id}" placeholder="${placeholder!}" />
    </div>
</div>