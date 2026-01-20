// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  app: {
	pageTransition: {
		name: 'page', mode: 'out-in'
	},

    head: {
      title: "Nuxt Mastering!",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device, initial-scale=1" },
        { hid: "description", name: "description", content: "My Nuxt App" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
});
