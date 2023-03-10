import Header from "../layout/Header";
import Button from "../form-controls/Button";
import { TextInput } from "../form-controls/TextInput";
import { useRef } from "react";
import { theme } from "../../theme/primary";
import { ThemeProvider } from "styled-components";
import { ScreenSafeView } from "../layout/View";
import Wrapper from "../layout/Wrapper";
import Footer from "../layout/Footer";
import styled from "styled-components/native";
import Field from "../common/Field";
import Divider from "../layout/Divider";
import { FieldSet } from "../common/FieldSet";
import { COUNTRY_CODES } from "../../data/tariff-constants";
import Dropdown from "../form-controls/Dropdown";

const InputValue = styled(TextInput).attrs(({ refs, refIndex }) => {
  return {
    autoCapitalize: "none",
    autoCorrect: false,
    ref: refs[refIndex],
    ...(refIndex < refs.length - 1
      ? {
          returnKeyType: "next",
          onSubmitEditing: () => refs[refIndex + 1].current.focus(),
        }
      : {}),
  };
})``;

export default function AddressEdit({
  navigation,
  address: {
    address_line1,
    address_line2,
    city,
    state,
    post_code,
    country_code,
  },
  area,
  setAddressField,
}) {
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView>
        <Header title="ENTER POSTAL ADDRESS" useLogo={true} />
        <Divider />
        <Wrapper>
          <FieldSet>
            <Field label={"House number or name"} description={"Line 1"}>
              <InputValue
                value={address_line1}
                isFirst={true}
                onChangeText={(text) =>
                  setAddressField({ key: "address_line1", value: text })
                }
                refs={refs}
                refIndex={0}
              />
            </Field>
            <Field label={"Street name"} description={"Line 2"}>
              <InputValue
                value={address_line2}
                onChangeText={(text) =>
                  setAddressField({ key: "address_line2", value: text })
                }
                refs={refs}
                refIndex={1}
              />
            </Field>
            <Field label={"City"} description={"Line city"}>
              <InputValue
                value={city}
                onChangeText={(text) =>
                  setAddressField({ key: "city", value: text })
                }
                refs={refs}
                refIndex={2}
              />
            </Field>
            <Field label={"State"} description={"Line state"}>
              <InputValue
                label="State"
                value={state}
                onChangeText={(text) =>
                  setAddressField({ key: "state", value: text })
                }
                refs={refs}
                refIndex={3}
              />
            </Field>
            <Field label={"Post / ZIP code"} description={"Line post_code"}>
              <InputValue
                label="Postcode"
                value={post_code}
                onChangeText={(text) =>
                  setAddressField({ key: "post_code", value: text })
                }
                refs={refs}
                refIndex={4}
              />
            </Field>
            <Field label={"Country"} description={"Line country"}>
              <Dropdown
                value={country_code}
                options={area.map((entry) => entry.country_code)}
                labelExtractor={(key) => COUNTRY_CODES[key]}
                onChangeText={(text) => {
                  setAddressField({ key: "country_code", value: text });
                }}
              />
            </Field>
          </FieldSet>

          <Footer>
            <Button
              title={"Next"}
              variant="executive"
              onPress={() => {
                navigation.push("ProviderSelection");
                //navigation.push("TariffSetup");
              }}
            />
          </Footer>
        </Wrapper>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
