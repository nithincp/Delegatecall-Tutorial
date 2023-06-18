const {expect} = require("chai")
const {ethers} = require("hardhat")

describe("Delegatecall attack",function(){
    it("Should change the owner of the Good contract", async function(){
        const Helper = await ethers.getContractFactory("Helper")
        const helperContract = await Helper.deploy()
        await helperContract.deployed()
        console.log(`Helper Contract's address : ${helperContract.address}`)

        const Good = await ethers.getContractFactory("Good")
        const goodContract = await Good.deploy(helperContract.address)
        await goodContract.deployed()
        console.log(`Good Contract's address : ${goodContract.address}`)

        const Attack = await ethers.getContractFactory("Attack")
        const attackContract = await Attack.deploy(goodContract.address)
        await attackContract.deployed()
        console.log(`Attack Contract's address : ${attackContract.address}`)

        let tx = await attackContract.attack()
        await tx.wait()

        expect(await goodContract.owner()).to.equal(attackContract.address)
    })
})