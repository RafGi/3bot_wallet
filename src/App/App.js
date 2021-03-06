import toolbar from '../components/toolbar'
import bottomNav from '../components/bottomNav'
import editWallet from '../components/editWallet'
import copyDialog from '../components/copydialog'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    toolbar,
    bottomNav,
    copyDialog,
    editWallet
  },
  mounted () {
  },
  data () {
    return {
      showCreateWalletDialog: false,
      showEditWalletDialog: false,
      hideSnackbarTimeout: 6000
    }
  },
  computed: {
    ...mapGetters([
      'informationMessage',
      'fatalError',
      'isImportingWallet'
    ]),
    cssProps () {
      return {
        '--primary-color': this.$vuetify.theme.themes.light.primary,
        '--accent-color': this.$vuetify.theme.themes.light.accent,
        '--error-color': this.$vuetify.theme.themes.light.error,
        '--gold-color': this.$vuetify.theme.themes.light.gold,
        '--active-color': this.$vuetify.theme[this.$route.meta.accent]
      }
    }
  },
  methods: {
    ...mapActions([
      'createWallet',
      'setInformationMessage',
      'setImportingWallets'
    ]),
    handleCTAClick (data) {
      if (this.$route.name === 'home') {
        this.showCreateWalletDialog = !this.showCreateWalletDialog
        // if (data) this.createWallet(data)
      }
      // if (this.$route.name === 'history') {
        // this.showEditWalletDialog = !this.showEditWalletDialog
        // if (data) this.createWallet(data)
      // }
    }

  },
  watch: {
    informationMessage (val) {
      if (val) {
        setTimeout(() => {
          this.setInformationMessage('')
        }, this.hideSnackbarTimeout)
      }
    },
    fatalError (val) {
      console.error(`ERROR`, val)
      this.$router.push({
        name: 'error',
        query: { msg: val }
      })
    }
  }
}
