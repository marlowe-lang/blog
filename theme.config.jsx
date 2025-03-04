export default {
  // Not sure why nx-mr-4 is not working and I was froced to use carazy style property
  footer:
    <div className="nx-flex nx-items-center nx-space-x-4">
      <a href="https://twitter.com/marlowe_io" class="hover:nx-text-blue-400" target="_blank">
        <i className="fab fa-twitter fa-lg"></i>
      </a>
      <a href="https://github.com/marlowe-lang" class="hover:nx-text-gray-400" target="_blank">
        <i className="fab fa-github fa-lg"></i>
      </a>
    </div>,
  head: ({ title: _title, meta }) => (
    <>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </>
  ),
  logos: {
    dark: "/logo-full-white.svg",
    light: "/logo-full-black.svg",
  },
  readMore: 'Read\u00A0More\u00A0→',
  postFooter: null,
  darkMode: true,
  navs: [],
  title: {
    prefix: "Marlowe | "
  }
  //   {
  //     url: 'https://github.com/shuding/nextra',
  //     name: 'Nextra'
  //   }
  // ]
}
