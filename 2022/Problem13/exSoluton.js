import fs from 'fs';
import path from 'path'
import { toDataFormatted, splitLine, splitAll } from '../../utils/fileRead.js'

const input = toDataFormatted(
  path.join('.', '2022', 'Problem13', 'input.txt'),
  str => str.split('\n\r'),
  lines => lines.map(line => splitLine(line).filter(x=>x)),
  lines => lines.map(line => line.map(val => JSON.parse(val)))
)


// console.log(input)

let indiciesSum = 0;

for (let i = 0; i < input.length; i++) {
    if (checkPackets(input[i][0], input[i][1])) {
        indiciesSum += i + 1;
        console.log(i + 1);
    }
}

console.log(indiciesSum);

function checkPackets(leftPacket, rightPacket) {
    console.log(`compare ${JSON.stringify(leftPacket)} vs ${JSON.stringify(rightPacket)}`);
    // console.log("compare " + leftPacket + " vs " + rightPacket); //what kind of bs is this, js must be high on something
    // console.log(leftPacket) // this one shows the array just fine, but the above doesn't, it strips out all the [] and even of subarrays
    
    let i = 0
    for (; i < leftPacket.length; i++) { //for every item in the first packet. If the packet is shorter, they are in the right order
        let left = leftPacket[i]
        let right = rightPacket[i]

        
        if (right === undefined) {
            console.log("  - Right side ran out of items, so inputs are not in the right order");
            return false;
        }

        if (typeof left === "number" && typeof right === "number") {
            console.log(`compare ${left} vs ${right}`);

            if (left < right) {
                console.log("    - Left side is smaller, so inputs are in the right order");
                return true;
            }
            else if (left > right) {
                console.log("   - Right side is smaller, so inputs are not in the right order")
                return false;
            }
            else {
                //continue checking
                continue;
            }
        } else if (typeof left === "object" && typeof right === "object") {
            let statusOfNestedArray = checkPackets(left, right);
            if (statusOfNestedArray == null) {
                continue;
            } else {
                return statusOfNestedArray;
            }
        } else { //one of them is array and one is a number
            //hmm,… thinking abt it, this else could be somehow joined into the previous if, so there is only one code for handling the returned null or sth like that idk
            console.log("mixed types")
            if (typeof left === "number") {
                let statusOfNestedArray = checkPackets([left], right);
                if (statusOfNestedArray == null) {
                    continue;
                } else {
                    return statusOfNestedArray;
                }
            } else {
                let statusOfNestedArray = checkPackets(left, [right]);
                if (statusOfNestedArray == null) {
                    continue;
                } else {
                    return statusOfNestedArray;
                }
            }
        }
    }

    //if the program has gotten here, it means that either the right packet has a longer list or both packets are the same
    if (rightPacket.length > i) {
        console.log("  - Left side ran out of items, so inputs are in the right order")
        return true;
    } else {
        return null; //this list didn't determine the correct order of the packets
    }

}