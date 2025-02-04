require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.27",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200
                    },
                    evmVersion: "berlin"
                }
            }
        ]
    },
};
