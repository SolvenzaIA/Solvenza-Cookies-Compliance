import {
  ref,
  onUnmounted,
  watch,
  isRef,
  defineComponent,
  h,
  getCurrentInstance,
  type App,
  type Plugin,
  type Ref,
  type PropType,
  type VNode,
} from "vue";
import { Consent } from "../core/consent-engine.js";
import type { ConsentConfig } from "../core/types.js";

/**
 * Vue 3 Composable to reactively subscribe to a consent category.
 *
 * @param category - Category ID (string or Ref<string>)
 * @returns Ref<boolean> indicating if the category is allowed
 *
 * @example
 * ```ts
 * const isAnalyticsAllowed = useConsent('analytics');
 * ```
 */
export function useConsent(category: string | Ref<string>): Ref<boolean> {
  const getCategory = () => (isRef(category) ? category.value : category);
  const allowed = ref<boolean>(Consent.has(getCategory()));

  const update = () => {
    allowed.value = Consent.has(getCategory());
  };

  const unsubs = [
    Consent.on("consent:changed", update),
    Consent.on("consent:accepted", update),
    Consent.on("consent:rejected", update),
    Consent.on("consent:withdrawn", update),
    Consent.on("ready", update),
  ];

  if (isRef(category)) {
    watch(category, () => {
      update();
    });
  }

  if (getCurrentInstance()) {
    onUnmounted(() => {
      unsubs.forEach((u) => u());
    });
  }

  return allowed;
}

/**
 * Vue 3 Composable to reactively subscribe to a specific service.
 *
 * @param serviceId - Service ID (string or Ref<string>)
 * @returns Ref<boolean> indicating if the service is allowed
 */
export function useConsentService(serviceId: string | Ref<string>): Ref<boolean> {
  const getService = () => (isRef(serviceId) ? serviceId.value : serviceId);
  const allowed = ref<boolean>(Consent.hasService(getService()));

  const update = () => {
    allowed.value = Consent.hasService(getService());
  };

  const unsubs = [
    Consent.on("consent:changed", update),
    Consent.on("consent:accepted", update),
    Consent.on("consent:rejected", update),
    Consent.on("consent:withdrawn", update),
    Consent.on("ready", update),
  ];

  if (isRef(serviceId)) {
    watch(serviceId, () => {
      update();
    });
  }

  if (getCurrentInstance()) {
    onUnmounted(() => {
      unsubs.forEach((u) => u());
    });
  }

  return allowed;
}

/**
 * Vue 3 Composable to reactively subscribe to the active consent locale.
 */
export function useConsentLocale(): Ref<string> {
  const locale = ref<string>(Consent.getLocale());

  const update = (detail?: { locale: string }) => {
    locale.value = detail?.locale || Consent.getLocale();
  };

  const unsub = Consent.on("locale:changed", update);

  if (getCurrentInstance()) {
    onUnmounted(() => {
      unsub();
    });
  }

  return locale;
}

/**
 * Vue 3 Composable to synchronize parent app locale (e.g. vue-i18n locale)
 * with the cookie consent engine without boilerplate.
 */
export function useSyncConsentLocale(
  locale: Ref<string> | (() => string) | string,
): void {
  const sync = (val: string) => {
    if (val) {
      Consent.syncLocale(val);
    }
  };

  if (isRef(locale)) {
    watch(
      locale,
      (newVal) => {
        sync(newVal);
      },
      { immediate: true },
    );
  } else if (typeof locale === "function") {
    watch(
      locale,
      (newVal) => {
        sync(newVal);
      },
      { immediate: true },
    );
  } else if (typeof locale === "string") {
    sync(locale);
  }
}

/**
 * Declarative Vue 3 Component to conditionally render content based on consent.
 *
 * @example
 * ```vue
 * <ConsentGate category="marketing">
 *   <template #default>
 *     <iframe src="https://youtube.com/..." />
 *   </template>
 *   <template #fallback>
 *     <p>Vídeo bloqueado. Acepta cookies de marketing para reproducirlo.</p>
 *   </template>
 * </ConsentGate>
 * ```
 */
export const ConsentGate = defineComponent({
  name: "ConsentGate",
  props: {
    category: {
      type: String as PropType<string>,
      required: false,
    },
    service: {
      type: String as PropType<string>,
      required: false,
    },
  },
  setup(props, { slots }) {
    const isAllowed = ref<boolean>(false);

    const check = () => {
      if (props.service) {
        isAllowed.value = Consent.hasService(props.service);
      } else if (props.category) {
        isAllowed.value = Consent.has(props.category);
      } else {
        isAllowed.value = true;
      }
    };

    check();

    const unsubs = [
      Consent.on("consent:changed", check),
      Consent.on("consent:accepted", check),
      Consent.on("consent:rejected", check),
      Consent.on("consent:withdrawn", check),
      Consent.on("ready", check),
    ];

    if (getCurrentInstance()) {
      onUnmounted(() => {
        unsubs.forEach((u) => u());
      });
    }

    return (): VNode | null => {
      if (isAllowed.value) {
        return slots.default ? h("div", { class: "consent-gate-allowed" }, slots.default()) : null;
      }
      return slots.fallback ? h("div", { class: "consent-gate-fallback" }, slots.fallback()) : null;
    };
  },
});

/**
 * Vue 3 Plugin factory for Solvenza Cookies Compliance.
 *
 * @example
 * ```ts
 * import { createApp } from 'vue';
 * import { createConsentPlugin } from '@solvenza/cookies-compliance/vue';
 * import App from './App.vue';
 *
 * const app = createApp(App);
 * app.use(createConsentPlugin('/consent.json'));
 * app.mount('#app');
 * ```
 */
export function createConsentPlugin(
  configOrUrl: string | ConsentConfig = "/consent.json",
): Plugin {
  return {
    install(app: App) {
      if (typeof window !== "undefined") {
        void Consent.init(configOrUrl);
      }

      app.provide("consent", Consent);
      app.config.globalProperties.$consent = Consent;
      app.component("ConsentGate", ConsentGate);
    },
  };
}
