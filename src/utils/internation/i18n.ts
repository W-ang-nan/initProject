import { createI18n } from "vue-i18n";
import en from './en';
import zh from './zh';


const locale = localStorage.getItem('language') || 'zh';

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale,
  messages:{
    en,
    zh
  },
});

export default i18n;
