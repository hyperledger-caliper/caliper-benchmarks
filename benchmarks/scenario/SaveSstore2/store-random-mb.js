'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

/**
 * This Caliper workload class generates a single random string of a requested
 * size (in MB) and uploads it in one transaction to the "storeAndCheck" method
 * of the simplified Anchor contract.
 */
class StoreRandomMB extends WorkloadModuleBase {
    constructor() {
        super();
    }
    async prepareWorkload() {
    }
    /**
     * Generate a random alphanumeric string of length len.
     * @param {number} len Length of string to generate
     * @returns {string} A pseudo-random alphanumeric string
     */
    _randomString(len) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let out = '';
        for (let i = 0; i < len; i++) {
            out += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return out;
    }

    /**
     * The main transaction submission function. It generates a single random
     * string, then submits it to storeAndCheck on the Anchor contract.
     */
    async submitTransaction() {
        // Use the user-supplied "totalMB" argument or default to 1
        const totalMB = this.roundArguments.totalMB || 1;

        // Convert MB to bytes
        const totalBytes = totalMB * 1024 * 1024;

        // Create one large random string
        const randomStr = this._randomString(totalBytes);

        console.log(
            `[StoreRandomMB] Worker ${this.workerIndex} storing ~${totalMB} MB of data ` +
            `in a single transaction.`
        );

        // Submit the transaction, calling the contract's storeAndCheck function
        await this.sutAdapter.sendRequests({
            contract: 'SaveSstore2',        // Your simplified Anchor contract name
            verb: 'storeAndCheck',     // The function name in your contract
            args: [randomStr],         // The single argument: the large random string
            readOnly: false
        });
    }
}

/**
 * Factory function for Caliper to instantiate this workload.
 */
function createWorkloadModule() {
    return new StoreRandomMB();
}

module.exports.createWorkloadModule = createWorkloadModule;