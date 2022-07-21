export default {
  name: 'rules',
  data() {
    return {
      usernameVal: (value) => !!/^[a-zA-Z0-9_.-]+$/.exec(value) ||
        'Username can only consist of A-Z, underscore or hyphen',
      fieldRequired: (value) => !!value || 'Required.',
      categoryField: (value) => !!value || 'Required.',
      tosValidator: (v) => !!v || 'Must accept terms and condition',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      emailRule: (v) => /.+@.+\..+/.test(v) || 'Invalid e-mail',
      passwordMatch: (value, password) =>
        value === password || 'Password does not match',
      thumbMaxSiz:
        value => !value || value.size < 2000000 || 'Thumbnail size should be less than 2 MB!',
      titleMin: (v) => v.length >= 3 || 'Min 3 characters',
    }
  }
}
