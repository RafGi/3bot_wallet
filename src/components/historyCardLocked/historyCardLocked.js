import amountIndicator from '../amountIndicator'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'history-card',
  components: { amountIndicator },
  props: {
    'transaction': {
      type: Object
    },
    'outgoing': {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false,
      smallAmount: true
    }
  },
  computed: {
    ...mapGetters({
      wallets: 'wallets'
    }),
    valuta () {
      return this.transaction.amount.unit
    },
    amountModal () {
      return this.amountHandler(true)
    },
    amount () {
      return this.amountHandler(false)
    },
    receiver () {
      if (this.wallets.some(x => x.address == this.getWalletAddresRecipient())) {
        let wallet = this.wallets.find(x => x.address == this.getWalletAddresRecipient())
        return `${wallet.name}@${wallet.holder.account_name.split(':')[1]}`
      }
      var receiverName = this.getWalletAddresRecipient()
      return receiverName
    },
    sender () {
      return this.transaction.senders[0]
      // if (this.transaction.sender) {
      //   let sender = JSON.parse(this.transaction.sender)
      //   return `${sender.walletname}@${sender.account.split(':')[1]}`
      // } else if (!this.transaction.confirmed) return 'Pending transaction...'
      // var senderAddress = this.getWalletAddresSender()
      // return senderAddress
    },
    timeStamp () {
      var date
      if (this.transaction.timestamp == null || this.transaction.timestamp == '-1') {
        date = new Date()
      } else {
        date = new Date(0)
        date.setUTCSeconds(this.transaction.timestamp)
      }
      return date
    },
    fee () {
      var total = 0
      var fees = this.transaction.outputs.filter(x => x.is_fee)
      fees.forEach(fee => {
        var amount = fee.amount.str({ precision: 3 }).replace(',', '')
        total += parseFloat(amount)
      })
      return total.toLocaleString('nl-BE', { minimumFractionDigits: 2, useGrouping: false })
    },
    lockedValue () {
      let lockValue = this.transaction.lock
      let isTimestamp = this.transaction.lock_is_timestamp
      if (lockValue) {        
        if (isTimestamp) {
          const lockDate = new Date(lockValue * 1000)
          const momentLockDate = moment(lockDate)
          const formattedDate = moment(lockDate).format('MMMM Do YYYY, HH:mm z')
          const momentChainDate = moment()
          if (momentLockDate < momentChainDate) {
            return 'Unlocked since '.concat(formattedDate)
          }
          return 'Locked until '.concat(formattedDate)
        } else {
          return 'Locked until block '.concat(lockValue)
        }
      }
    }
  },
  mounted () {

  },
  methods: {
    getWalletAddresRecipient () {
      // var address = null
      // if (this.transaction.inputs && this.transaction.inputs.length) {
      //   var input = this.transaction.inputs.find(x => !x.fee)
      //   if (input) address = input.recipient
      // } else {
      //   var output = this.transaction.outputs.find(x => !x.fee)
      //   if (output) address = output.recipient
      // }
      // return address
      return this.transaction.recipient
    },
    getWalletAddresSender () {
      // var address = null
      // if (this.transaction.outputs && this.transaction.outputs.length) {
      //   var output = this.transaction.outputs.find(x => !x.fee)
      //   if (output) address = output.senders[0]
      // } else {
      //   var input = this.transaction.inputs.find(x => !x.fee)
      //   if (input) address = input.senders[0]
      // }
      // return address
      return this.transaction.senders[0]
    },
    sumTransactionAmount (arr, modal) {
      var total = 0.00
      arr.forEach(output => {
        var amount = output.amount.str().replace(',', '')

        total = Number((Number(total) + Number(amount)).toFixed(9))
      })

      return total.toFixed(2)
    },
    isJsonObject (obj) {
      try {
        JSON.parse(obj)
        return true
      } catch (e) {
        return false
      }
    },
    amountHandler (modal) {
      if (this.transaction) {
        if (this.transaction.inputs && this.transaction.inputs.length) {
          this.outgoing = false
          return this.sumTransactionAmount(this.transaction.inputs, modal)
        } else if (this.transaction.outputs && this.transaction.outputs.length) {
          this.outgoing = true
          return '-' + this.sumTransactionAmount(this.transaction.outputs, modal)
        }
      } else {
        return '---'
      }
    }
  }
}
