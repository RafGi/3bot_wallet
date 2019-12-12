import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: 'create-wallet',
  components: {},
  props: {
    'show': {
      type: Boolean
    }
  },
  data() {
    return {
      walletName: null,
      words: null,
      walletNameErrors: [],
      wordsErrors: [],
    }
  },
  computed: {
    ...mapGetters([
      'doubleName'
    ])
  },
  mounted() {

  },
  methods: {
    ...mapActions([
      'importWallet'
    ]),
    addWallet() {
      if(!this.walletName) {
        this.walletNameErrors.push("Please enter a name.")
        return
      }

      if(!this.words) {
        this.wordsErrors.push("Please enter your words / seed phrase.")
        return
      }

      this.words = this.words.replace(/[^a-zA-Z ]/g, '').toLowerCase().trim().replace(/\s\s+/g, ' ')
      let wordCount = this.words.split(" ").length

      if(wordCount !== 24) {
        this.wordsErrors.push("Please make sure you've entered 24 words. [" + wordCount + "/24]")
        return
      }

      if(this.walletName && wordCount === 24) {
        this.importWallet({doubleName: this.doubleName, walletName: this.walletName, words: this.words})
        if(Print) {
          Print.postMessage("{\"type\": \"ADD_IMPORT_WALLET\", \"walletName\": \"" + this.walletName + "\", \"doubleName\": \"" + this.doubleName + "\", \"words\": " + this.words + "}");
        }
      }

      
      this.$emit('ctaClicked')
      this.walletName = null
      this.words = null
    }
  }
}