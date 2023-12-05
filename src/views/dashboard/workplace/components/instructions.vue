<template>
    <a-card title="后台说明" :bordered="false">
        <p>1、使用后台页面时，请确保Bot插件正在运行，否则会出现无法读取/提交等可能。</p>
        <p>2、如果没有找到需要选择的群号时，请确定Bot是否已经添加到群内，然后点击右上角头像刷新群列表。</p>
        <p>3、如果没有找到需要选择的图片时，请将图片添加到[插件目录/BotImg/face]目录下，然后再刷新页面。</p>
        <p>4、如果没有找到需要选择的字体时，请将图片添加到[插件目录/Font]目录下，然后再刷新页面。</p>
        <p>5、如果遇到修改某项配置且保存后没有生效时，可以先手动修改[插件目录/Config]目录下对应的配置文件，然后再提交Issuse。</p>
    </a-card>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
p {
    line-height: 30px;
}
</style>
