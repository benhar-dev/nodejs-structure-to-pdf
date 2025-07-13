const ads = require("ads-client");

module.exports = class ADSReadSymbol {
  static async getValueFromClient(variableName, netId, port) {
    const client = ADSReadSymbol.createAdsClient(netId, port);
    await client.connect();
    try {
      const response = await client.readSymbol(variableName);
      return response.value;
    } finally {
      await client.disconnect();
    }
  }

  static createAdsClient(netId, port) {
    return new ads.Client({
      targetAmsNetId: netId,
      targetAdsPort: port,
    });
  }
};
