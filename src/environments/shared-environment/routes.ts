export const routes = {
  ping: '/ping',
  contacts: '/contacts',
  threads: {
    many: '/threads',
    one: (id: string): string => `/threads/${ id }`
  },
}