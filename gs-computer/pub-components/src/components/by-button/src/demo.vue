<!-- __title: 领导力：产品经理的软实力 -->
<!-- __desc:
  领导力和管理更多的是内功的体现，而很多理论知识和方法是功法，不一定非要按照教科书去做，很多时候你需要一套自己的功法，你只要将自己的团队带领走向成功，那么你就是管理大师。
  很多人做了一段时间产品经理，回头发现自己更多的是Axure专员，技能存在于线框图的拖拽，需求说明也是简单的文字描述，当然页面的流程就是简单的线条进行连接。
  这种方式在工作效率是最高的，但是我们需要考虑以后，自己仅仅只是绘制简单的线框图吗？
-->
<!-- __demo: 不是的，我们在自己掌握的技能和工具之后，进行软实力的提升，这些软实力是你以后上升的通道 -->

<template>
  <button
    class="by-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'by-button--' + type : '',
      buttonSize ? 'by-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="by-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'ByButton',

    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      buttonSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      buttonDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      }
    },

    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
<!-- @vuese:code 这里是结束 -->