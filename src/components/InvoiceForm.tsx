import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

const parse = (val: string) => parseFloat(val) || 0;

const fieldLabels: { [key: string]: string } = {
  qty: "Quantity",
  price: "Price (₹)",
  discountPercent: "Discount (%)",
  discount: "Discount (₹)",
  taxPercent: "Tax (%)",
  tax: "Tax (₹)",
  total: "Total (₹)",
};

const InvoiceForm = ({ invoice, setInvoice, onSubmit, editing }) => {
  const recalculate = (changedKey: string, changedValue: string) => {
    const newInvoice = { ...invoice, [changedKey]: changedValue };
    const qty = parse(newInvoice.qty);
    const price = parse(newInvoice.price);
    let discountPercent = parse(newInvoice.discountPercent);
    let discount = parse(newInvoice.discount);
    let taxPercent = parse(newInvoice.taxPercent);
    let tax = parse(newInvoice.tax);
    let total = parse(newInvoice.total);

    const base = qty * price;

    if (changedKey === "discountPercent") {
      discount = (base * discountPercent) / 100;
    } else if (changedKey === "discount") {
      discountPercent = base ? (discount / base) * 100 : 0;
    }

    const afterDiscount = base - discount;

    if (changedKey === "taxPercent") {
      tax = (afterDiscount * taxPercent) / 100;
    } else if (changedKey === "tax") {
      taxPercent = afterDiscount ? (tax / afterDiscount) * 100 : 0;
    }

    total = afterDiscount + tax;

    setInvoice({
      qty: newInvoice.qty,
      price: newInvoice.price,
      discountPercent: discountPercent.toFixed(2),
      discount: discount.toFixed(2),
      taxPercent: taxPercent.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    });
  };

  return (
    <View style={styles.form}>
      {["qty", "price", "discountPercent", "discount", "taxPercent", "tax", "total"].map((key) => (
        <TextInput
          key={key}
          label={fieldLabels[key]}
          value={invoice[key]}
          onChangeText={(val) => key !== "total" && recalculate(key, val)}
          keyboardType="numeric"
          style={styles.input}
          editable={key !== "total"}
        />
      ))}
      <Button
        mode="contained"
        onPress={onSubmit}
        style={{ marginTop: 8 }}
        contentStyle={{ paddingVertical: 6 }}
        buttonColor="#007bff"
      >
        {editing ? "Update Invoice" : "Add Invoice"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#f9fafb",
  },
});

export default InvoiceForm;
