class Watch:
    def __init__(self, data):
        self.name = data['listing']['model']['displayName']
        self.brand_name = data['listing']['model']['brand']['displayName']
        self.reference_number = data['listing']['model']['referenceNumber']
        self.image_url = data['listing']['images'][0]['image']['url']
        self.condition = data['listing']['condition']
        self.manufacture_year = data['listing']['manufactureYear']
        self.sale_price_cents = data['salePriceCents']
        self.commission_rate_bips = data['commissionRateBips']
        self.seller_fee_cents = data['sellerFeeCents']
        self.payout_amount_cents = data['payoutAmountCents']

    def get_details(self):
        return {
            'name': self.name,
            'brand_name': self.brand_name,
            'reference_number': self.reference_number,
            'image_url': self.image_url,
            'condition': self.condition,
            'manufacture_year': self.manufacture_year,
            'sale_price_cents': self.sale_price_cents,
            'commission_rate_bips': self.commission_rate_bips,
            'seller_fee_cents': self.seller_fee_cents,
            'payout_amount_cents': self.payout_amount_cents
        }