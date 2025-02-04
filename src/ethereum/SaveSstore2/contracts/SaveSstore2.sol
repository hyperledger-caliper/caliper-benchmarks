// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import {SSTORE2} from "sstore2/contracts/SSTORE2.sol";

contract SaveSstore2 {
    /*
     * @dev Writes the given string to a new SSTORE2 pointer, then immediately
     *      reads it back and checks that the written and read values match.
     *      Reverts if they do not match.
     */
    function storeAndCheck(string memory data) external {
        // Write string bytes into SSTORE2
        address pointer = SSTORE2.write(bytes(data));

        // Read the stored data back
        bytes memory stored = SSTORE2.read(pointer);

        // Compare hashes to ensure they match
        require(
            keccak256(stored) == keccak256(bytes(data)),
            "Stored string does not match the original"
        );
    }
}