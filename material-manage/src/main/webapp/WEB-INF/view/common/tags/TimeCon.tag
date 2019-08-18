@/*
    时间查询条件标签的参数说明:

    name : 查询条件的名称
    id : 查询内容的input框id
    type : date 或者 datetime
@*/
<div class="input-group">
    <div class="fg-line">
    <input id="${id}"  type="text"
           @if(isNotEmpty(type)){
                @if(type == "date"){
                    class="form-control date-picker"
                @}else{
                    class="form-control date-time-picker"
                @}
            @}else{
                class="form-control date-picker"
            @}

           @if(isNotEmpty(value)){
           value="${tool.dateType(value)}"
           @}

           @if(isNotEmpty(readonly)){
           readonly="${readonly}"
           @}

           @if(isNotEmpty(placeholder)){
            placeholder="${placeholder}"
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