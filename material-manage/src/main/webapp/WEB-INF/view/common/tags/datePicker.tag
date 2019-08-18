@/*
表单中日期选择框框标签中各个参数的说明:

id : 元素id
name : 元素名称
readonly : readonly属性
placeHolder : placeHolder
disabled: 是否禁用
value : 默认值
style : 附加的css属性
id : 查询内容的input框id
type : date 或者 datetime
@*/
<div class="form-group">
    <label class="col-sm-3 control-label">${name}</label>
    <div class="col-sm-9">
        <div class="fg-line">
            <input
                  @if(isNotEmpty(type)){
                    @if(type == "date"){
                        class="form-control date-picker"
                    @}else{
                        class="form-control date-time-picker"
                    @}
                  @}else{
                    class="form-control date-picker"
                  @}

                   id="${id}" name="${id}" type="text"
                   @if(isNotEmpty(value)){
                   value="${tool.dateType(value)}"
                   @}

                   @if(isNotEmpty(readonly)){
                   readonly="${readonly}"
                   @}

                   @if(isNotEmpty(placeHolder)){
                   placeHolder="${placeHolder}"
                   @}

                   @if(isNotEmpty(style)){
                   style="${style}"
                   @}
                   @if(isNotEmpty(disabled)){
                   disabled="${disabled}"
                   @}
            >

        </div>
    </div>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
<div class="hr-line-dashed"></div>
@}


