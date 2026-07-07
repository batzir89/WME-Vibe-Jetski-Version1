# `wz-autocomplete` Component Specification

This document provides the specification for the Waze Styleguide `wz-autocomplete` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-autocomplete`
**Encapsulation:** `shadow`
**Dependencies:** `wz-autocomplete-item-text`, `wz-basic-tooltip`, `wz-tooltip-source`, `wz-tooltip-target`, `wz-tooltip-content`, `wz-menu-item`, `wz-menu-sub-menu`, `wz-menu-divider`, `wz-menu-title`, `wz-text-input`, `wz-menu`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `disabled` | `boolean` | `false` | whether or not to disable the AutoComplete input |
| `displayMaxlength` | `boolean` | `true` | Whether or not to display the value length / maxlength counter. |
| `enableNewItems` | `"AllowNewItems" \| "NoNewItems" \| "OnlyEmptyItem"` | `ENABLE_NEW_ITEMS.NO_NEW_ITEMS` | whether or not to allow setting the value of the search to be a string that is not in the getItems  useful in case you want to redirect to multi-option list once the search is complete. |
| `errorMessage` | `string` | `""` | The error message for error state |
| `getItems` | `(query: string) => IAutocompleteItem[] \| Promise<IAutocompleteItem[]>` | `() => []` | returns list of available autocomplete items |
| `getItemsDebounceTimeMs` | `number` | `0` | Setting this value greater than 0 will debounce getItems calls (use when you want to avoid extra calls while user is typing) |
| `getItemsTimeoutMs` | `number` | `1000` |  |
| `helperMessage` | `string` | `""` | The assistive text for the text input |
| `isCaseSensitive` | `boolean` | `false` | whether query is case-sensitive when matching options |
| `label` | `string` | `` | The label of the input |
| `maxlength` | `number` | `` | The max length that the AutoComplete input allows |
| `mode` | `"Contains" \| "Fuzzy" \| "PreMatched" \| "Prefix"` | `AUTOCOMPLETE_MODE.PRE_MATCHED` |  |
| `noSuggestionText` | `string` | `"No suggestions"` | text shown when there are no suggestions can only be applicable when sortItems is given |
| `placeholder` | `string` | `""` | the text that will be shown while the field is empty |
| `shouldCloseMenuOnSelection` | `boolean` | `true` |  |
| `shouldDisplayClearSymbol` | `boolean` | `false` |  |
| `shouldDisplayDropdownSymbol` | `boolean` | `false` |  |
| `shouldHideSuggestionsForEmptyQuery` | `boolean` | `false` | whether the suggestions should be hidden when the query is empty |
| `shouldMatchOnSecondaryText` | `boolean` | `false` | should autocomplete suggestions also run on secondary text |
| `shouldRenderChips` | `boolean` | `false` |  |
| `textChangedError` | `(reason: string) => void` | `(
    reason,
  ) => {
    console.error(`could not get filtered results - ${reason}`);
  }` |  |
| `value` | `IAutocompleteItem` | `null` | the selected Item. |

### Slots
*No slots defined.*

### Events
- `inputChanged`: the event which will be triggered when the user changes the
internal input.
- `itemSelected`: the event which will be triggered once an item is selected,
null will be thrown if the selection reset.
- `menuToggled`: the event which will be triggered when the suggestion menu is opened/closed

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        return this.renderComponent();
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
@font-face {
  font-family: "waze-web-icons";
  font-style: normal;
  font-weight: 400;
  font-display: auto;
  src: url("./waze-web-icons.eot");
  src: url("./waze-web-icons.eot?#iefix") format("embedded-opentype"), url("./waze-web-icons.woff2") format("woff2"), url("./waze-web-icons.woff") format("woff"), url("./waze-web-icons.ttf") format("truetype"), url("./waze-web-icons.svg#waze-web-icons") format("svg");
}
.w-icon {
  display: inline-block;
  font-family: "waze-web-icons";
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

.w-icon-lg {
  font-size: 1.33333em;
  line-height: 0.75em;
  vertical-align: -0.0667em;
}

.w-icon-xs {
  font-size: 0.75em;
}

.w-icon-sm {
  font-size: 0.875em;
}

.w-icon-1x {
  font-size: 1em;
}

.w-icon-2x {
  font-size: 2em;
}

.w-icon-3x {
  font-size: 3em;
}

.w-icon-4x {
  font-size: 4em;
}

.w-icon-5x {
  font-size: 5em;
}

.w-icon-6x {
  font-size: 6em;
}

.w-icon-7x {
  font-size: 7em;
}

.w-icon-8x {
  font-size: 8em;
}

.w-icon-9x {
  font-size: 9em;
}

.w-icon-10x {
  font-size: 10em;
}

.w-icon-fw {
  text-align: center;
  width: 1.25em;
}

.w-icon-border {
  border: solid 0.08em #eee;
  border-radius: 0.1em;
  padding: 0.2em 0.25em 0.15em;
}

.w-icon-pull-left {
  float: left;
}

.w-icon-pull-right {
  float: right;
}

.w-icon.w-icon-pull-left {
  margin-right: 0.3em;
}

.w-icon.w-icon-pull-right {
  margin-left: 0.3em;
}

.w-icon-add::before {
  content: "\ea01";
}

.w-icon-add-user::before {
  content: "\ea02";
}

.w-icon-ai-helper::before {
  content: "\ea03";
}

.w-icon-alert::before {
  content: "\ea04";
}

.w-icon-alert-danger::before {
  content: "\ea05";
}

.w-icon-alert-danger-outline::before {
  content: "\ea06";
}

.w-icon-alert-fill::before {
  content: "\ea07";
}

.w-icon-alert-info::before {
  content: "\ea08";
}

.w-icon-alert-success::before {
  content: "\ea09";
}

.w-icon-alert-warning::before {
  content: "\ea0a";
}

.w-icon-android::before {
  content: "\ea0b";
}

.w-icon-apple::before {
  content: "\ea0c";
}

.w-icon-applies-and-exceptions::before {
  content: "\ea0d";
}

.w-icon-apps::before {
  content: "\ea0e";
}

.w-icon-arrow-curve::before {
  content: "\ea0f";
}

.w-icon-arrow-down::before {
  content: "\ea10";
}

.w-icon-arrow-left::before {
  content: "\ea11";
}

.w-icon-arrow-right::before {
  content: "\ea12";
}

.w-icon-arrow-two-way::before {
  content: "\ea13";
}

.w-icon-arrow-up::before {
  content: "\ea14";
}

.w-icon-attachment::before {
  content: "\ea15";
}

.w-icon-audio-play-fill::before {
  content: "\ea16";
}

.w-icon-audio-player::before {
  content: "\ea17";
}

.w-icon-audio-stop-fill::before {
  content: "\ea18";
}

.w-icon-available-fill::before {
  content: "\ea19";
}

.w-icon-avoid-ferries::before {
  content: "\ea1a";
}

.w-icon-avoid-highways::before {
  content: "\ea1b";
}

.w-icon-avoid-tolls::before {
  content: "\ea1c";
}

.w-icon-avoid-unpaved::before {
  content: "\ea1d";
}

.w-icon-bell::before {
  content: "\ea1e";
}

.w-icon-bell-off-fill::before {
  content: "\ea1f";
}

.w-icon-bell-on-fill::before {
  content: "\ea20";
}

.w-icon-book::before {
  content: "\ea21";
}

.w-icon-bug-fill::before {
  content: "\ea22";
}

.w-icon-bug-outline::before {
  content: "\ea23";
}

.w-icon-bus::before {
  content: "\ea24";
}

.w-icon-business::before {
  content: "\ea25";
}

.w-icon-calendar::before {
  content: "\ea26";
}

.w-icon-calendar-fill::before {
  content: "\ea27";
}

.w-icon-call::before {
  content: "\ea28";
}

.w-icon-camera::before {
  content: "\ea29";
}

.w-icon-camera-fill::before {
  content: "\ea2a";
}

.w-icon-car::before {
  content: "\ea2b";
}

.w-icon-car-fill::before {
  content: "\ea2c";
}

.w-icon-car-services::before {
  content: "\ea2d";
}

.w-icon-caret-down::before {
  content: "\ea2e";
}

.w-icon-chat::before {
  content: "\ea2f";
}

.w-icon-checkmark::before {
  content: "\ea30";
}

.w-icon-checkmark-double::before {
  content: "\ea31";
}

.w-icon-chevron-double-left::before {
  content: "\ea32";
}

.w-icon-chevron-double-right::before {
  content: "\ea33";
}

.w-icon-chevron-down::before {
  content: "\ea34";
}

.w-icon-chevron-left::before {
  content: "\ea35";
}

.w-icon-chevron-right::before {
  content: "\ea36";
}

.w-icon-chevron-up::before {
  content: "\ea37";
}

.w-icon-city::before {
  content: "\ea38";
}

.w-icon-clock::before {
  content: "\ea39";
}

.w-icon-clock-fill::before {
  content: "\ea3a";
}

.w-icon-close-fill::before {
  content: "\ea3b";
}

.w-icon-closure::before {
  content: "\ea3c";
}

.w-icon-closure-failed::before {
  content: "\ea3d";
}

.w-icon-code::before {
  content: "\ea3e";
}

.w-icon-coins::before {
  content: "\ea3f";
}

.w-icon-collapse::before {
  content: "\ea40";
}

.w-icon-collapse-left::before {
  content: "\ea41";
}

.w-icon-collapse-right::before {
  content: "\ea42";
}

.w-icon-collapse-up::before {
  content: "\ea43";
}

.w-icon-collapse3::before {
  content: "\ea44";
}

.w-icon-collapse4::before {
  content: "\ea45";
}

.w-icon-computer::before {
  content: "\ea46";
}

.w-icon-coordinates::before {
  content: "\ea47";
}

.w-icon-copy::before {
  content: "\ea48";
}

.w-icon-crisis-locations-fill::before {
  content: "\ea49";
}

.w-icon-crisis-locations-outline::before {
  content: "\ea4a";
}

.w-icon-current-location::before {
  content: "\ea4b";
}

.w-icon-danger::before {
  content: "\ea4c";
}

.w-icon-doc::before {
  content: "\ea4d";
}

.w-icon-dot-menu::before {
  content: "\ea4e";
}

.w-icon-dot-menu-ios::before {
  content: "\ea4f";
}

.w-icon-download::before {
  content: "\ea50";
}

.w-icon-downloaded::before {
  content: "\ea51";
}

.w-icon-drag::before {
  content: "\ea52";
}

.w-icon-education::before {
  content: "\ea53";
}

.w-icon-email::before {
  content: "\ea54";
}

.w-icon-email-fill::before {
  content: "\ea55";
}

.w-icon-emoji::before {
  content: "\ea56";
}

.w-icon-equalizer::before {
  content: "\ea57";
}

.w-icon-error::before {
  content: "\ea58";
}

.w-icon-ev-car::before {
  content: "\ea59";
}

.w-icon-ev-charging::before {
  content: "\ea5a";
}

.w-icon-ev-connector-ccs-1::before {
  content: "\ea5b";
}

.w-icon-ev-connector-ccs-2::before {
  content: "\ea5c";
}

.w-icon-ev-connector-ccs-2-b::before {
  content: "\ea5d";
}

.w-icon-ev-connector-chademo::before {
  content: "\ea5e";
}

.w-icon-ev-connector-chao-ji-chademo-gen-3::before {
  content: "\ea5f";
}

.w-icon-ev-connector-gb-t-dc::before {
  content: "\ea60";
}

.w-icon-ev-connector-sae-j1772::before {
  content: "\ea61";
}

.w-icon-ev-connector-tesla::before {
  content: "\ea62";
}

.w-icon-ev-connector-type-2-menekes::before {
  content: "\ea63";
}

.w-icon-ev-connector-wo-type-a::before {
  content: "\ea64";
}

.w-icon-ev-connector-wo-type-c::before {
  content: "\ea65";
}

.w-icon-ev-connector-wo-type-g::before {
  content: "\ea66";
}

.w-icon-event-venue::before {
  content: "\ea67";
}

.w-icon-exclamation-fill::before {
  content: "\ea68";
}

.w-icon-exit-fullscreen::before {
  content: "\ea69";
}

.w-icon-expand1::before {
  content: "\ea6a";
}

.w-icon-expand2::before {
  content: "\ea6b";
}

.w-icon-expand3::before {
  content: "\ea6c";
}

.w-icon-external-link::before {
  content: "\ea6d";
}

.w-icon-eye-fill::before {
  content: "\ea6e";
}

.w-icon-eye-setting::before {
  content: "\ea6f";
}

.w-icon-eye1::before {
  content: "\ea70";
}

.w-icon-eye2::before {
  content: "\ea71";
}

.w-icon-feed::before {
  content: "\ea72";
}

.w-icon-filter::before {
  content: "\ea73";
}

.w-icon-flag::before {
  content: "\ea74";
}

.w-icon-flag-fill::before {
  content: "\ea75";
}

.w-icon-floppy::before {
  content: "\ea76";
}

.w-icon-food-drink::before {
  content: "\ea77";
}

.w-icon-fullscreen::before {
  content: "\ea78";
}

.w-icon-garbage-truck::before {
  content: "\ea79";
}

.w-icon-gas::before {
  content: "\ea7a";
}

.w-icon-google-fill::before {
  content: "\ea7b";
}

.w-icon-hamburger-menu::before {
  content: "\ea7c";
}

.w-icon-has-beacons-fill::before {
  content: "\ea7d";
}

.w-icon-headlights-fill::before {
  content: "\ea7e";
}

.w-icon-heart::before {
  content: "\ea7f";
}

.w-icon-heart-fill::before {
  content: "\ea80";
}

.w-icon-help::before {
  content: "\ea81";
}

.w-icon-history::before {
  content: "\ea82";
}

.w-icon-home::before {
  content: "\ea83";
}

.w-icon-home-fill::before {
  content: "\ea84";
}

.w-icon-hotel::before {
  content: "\ea85";
}

.w-icon-hov::before {
  content: "\ea86";
}

.w-icon-imagery-updated::before {
  content: "\ea87";
}

.w-icon-inbox::before {
  content: "\ea88";
}

.w-icon-info::before {
  content: "\ea89";
}

.w-icon-info-fill::before {
  content: "\ea8a";
}

.w-icon-intersection::before {
  content: "\ea8b";
}

.w-icon-invisible::before {
  content: "\ea8c";
}

.w-icon-issue-status-mixed-outline::before {
  content: "\ea8d";
}

.w-icon-issue-status-neglected::before {
  content: "\ea8e";
}

.w-icon-issue-status-open::before {
  content: "\ea8f";
}

.w-icon-issue-status-open-and-closed-outline::before {
  content: "\ea90";
}

.w-icon-issue-status-open-fill::before {
  content: "\ea91";
}

.w-icon-language::before {
  content: "\ea92";
}

.w-icon-layers::before {
  content: "\ea93";
}

.w-icon-license-plate::before {
  content: "\ea94";
}

.w-icon-link::before {
  content: "\ea95";
}

.w-icon-list::before {
  content: "\ea96";
}

.w-icon-location::before {
  content: "\ea97";
}

.w-icon-location-2::before {
  content: "\ea98";
}

.w-icon-location-check-fill::before {
  content: "\ea99";
}

.w-icon-location-error-fill::before {
  content: "\ea9a";
}

.w-icon-location-fill::before {
  content: "\ea9b";
}

.w-icon-location-info::before {
  content: "\ea9c";
}

.w-icon-location-off::before {
  content: "\ea9d";
}

.w-icon-location-off-fill::before {
  content: "\ea9e";
}

.w-icon-location-update-fill::before {
  content: "\ea9f";
}

.w-icon-lock::before {
  content: "\eaa0";
}

.w-icon-lock-fill::before {
  content: "\eaa1";
}

.w-icon-logout::before {
  content: "\eaa2";
}

.w-icon-map::before {
  content: "\eaa3";
}

.w-icon-map-edit::before {
  content: "\eaa4";
}

.w-icon-map-edit-fill::before {
  content: "\eaa5";
}

.w-icon-message::before {
  content: "\eaa6";
}

.w-icon-minus::before {
  content: "\eaa7";
}

.w-icon-motorcycle::before {
  content: "\eaa8";
}

.w-icon-navigation-angle::before {
  content: "\eaa9";
}

.w-icon-navigation-angle-fill::before {
  content: "\eaaa";
}

.w-icon-navigation-fill::before {
  content: "\eaab";
}

.w-icon-navigation-now-fill::before {
  content: "\eaac";
}

.w-icon-new::before {
  content: "\eaad";
}

.w-icon-node::before {
  content: "\eaae";
}

.w-icon-outdoor::before {
  content: "\eaaf";
}

.w-icon-outdoor-parks::before {
  content: "\eab0";
}

.w-icon-parking::before {
  content: "\eab1";
}

.w-icon-parking-2::before {
  content: "\eab2";
}

.w-icon-parking-fill::before {
  content: "\eab3";
}

.w-icon-partners::before {
  content: "\eab4";
}

.w-icon-paste::before {
  content: "\eab5";
}

.w-icon-pencil::before {
  content: "\eab6";
}

.w-icon-pencil-fill::before {
  content: "\eab7";
}

.w-icon-people::before {
  content: "\eab8";
}

.w-icon-pets::before {
  content: "\eab9";
}

.w-icon-phone::before {
  content: "\eaba";
}

.w-icon-phone-fill::before {
  content: "\eabb";
}

.w-icon-photo::before {
  content: "\eabc";
}

.w-icon-planned-drive-fill::before {
  content: "\eabd";
}

.w-icon-plus::before {
  content: "\eabe";
}

.w-icon-polygon::before {
  content: "\eabf";
}

.w-icon-project-fill::before {
  content: "\eac0";
}

.w-icon-pushpin::before {
  content: "\eac1";
}

.w-icon-pushpin-fill::before {
  content: "\eac2";
}

.w-icon-query-fill::before {
  content: "\eac3";
}

.w-icon-railway-crossing::before {
  content: "\eac4";
}

.w-icon-recenter::before {
  content: "\eac5";
}

.w-icon-recenter-off::before {
  content: "\eac6";
}

.w-icon-recheck::before {
  content: "\eac7";
}

.w-icon-redo::before {
  content: "\eac8";
}

.w-icon-refresh::before {
  content: "\eac9";
}

.w-icon-remove-location-fill::before {
  content: "\eaca";
}

.w-icon-remove-photo-fill::before {
  content: "\eacb";
}

.w-icon-restaurant::before {
  content: "\eacc";
}

.w-icon-restore::before {
  content: "\eacd";
}

.w-icon-road::before {
  content: "\eace";
}

.w-icon-road-fill::before {
  content: "\eacf";
}

.w-icon-round-trip::before {
  content: "\ead0";
}

.w-icon-roundabout::before {
  content: "\ead1";
}

.w-icon-route::before {
  content: "\ead2";
}

.w-icon-rss::before {
  content: "\ead3";
}

.w-icon-ruler::before {
  content: "\ead4";
}

.w-icon-saved-fill::before {
  content: "\ead5";
}

.w-icon-saved-outline::before {
  content: "\ead6";
}

.w-icon-schedule-apply-times::before {
  content: "\ead7";
}

.w-icon-schedule-exclude-times::before {
  content: "\ead8";
}

.w-icon-school::before {
  content: "\ead9";
}

.w-icon-school-fill::before {
  content: "\eada";
}

.w-icon-script::before {
  content: "\eadb";
}

.w-icon-search::before {
  content: "\eadc";
}

.w-icon-send-fill::before {
  content: "\eadd";
}

.w-icon-send-to-phone::before {
  content: "\eade";
}

.w-icon-sent::before {
  content: "\eadf";
}

.w-icon-settings::before {
  content: "\eae0";
}

.w-icon-share::before {
  content: "\eae1";
}

.w-icon-sheild::before {
  content: "\eae2";
}

.w-icon-smart-assistant::before {
  content: "\eae3";
}

.w-icon-smart-phone::before {
  content: "\eae4";
}

.w-icon-snapshot::before {
  content: "\eae5";
}

.w-icon-snow-plow::before {
  content: "\eae6";
}

.w-icon-sort::before {
  content: "\eae7";
}

.w-icon-sound-arrow-after::before {
  content: "\eae8";
}

.w-icon-sound-arrow-down::before {
  content: "\eae9";
}

.w-icon-sound-off::before {
  content: "\eaea";
}

.w-icon-sound-off-fill::before {
  content: "\eaeb";
}

.w-icon-sound-on::before {
  content: "\eaec";
}

.w-icon-sound-on-fill::before {
  content: "\eaed";
}

.w-icon-sound-setting::before {
  content: "\eaee";
}

.w-icon-speed-camera::before {
  content: "\eaef";
}

.w-icon-star::before {
  content: "\eaf0";
}

.w-icon-star-fill::before {
  content: "\eaf1";
}

.w-icon-store::before {
  content: "\eaf2";
}

.w-icon-store-fill::before {
  content: "\eaf3";
}

.w-icon-streetview::before {
  content: "\eaf4";
}

.w-icon-streetview-fill::before {
  content: "\eaf5";
}

.w-icon-subtract-outline::before {
  content: "\eaf6";
}

.w-icon-suggestion-fill::before {
  content: "\eaf7";
}

.w-icon-suggestion-outline::before {
  content: "\eaf8";
}

.w-icon-switch::before {
  content: "\eaf9";
}

.w-icon-tag::before {
  content: "\eafa";
}

.w-icon-taxi::before {
  content: "\eafb";
}

.w-icon-theater::before {
  content: "\eafc";
}

.w-icon-themes::before {
  content: "\eafd";
}

.w-icon-themes-fill::before {
  content: "\eafe";
}

.w-icon-thumbs-down::before {
  content: "\eaff";
}

.w-icon-thumbs-down-fill::before {
  content: "\eb00";
}

.w-icon-thumbs-up::before {
  content: "\eb01";
}

.w-icon-thumbs-up-fill::before {
  content: "\eb02";
}

.w-icon-thunderbolt::before {
  content: "\eb03";
}

.w-icon-toolbox::before {
  content: "\eb04";
}

.w-icon-translate::before {
  content: "\eb05";
}

.w-icon-transportation::before {
  content: "\eb06";
}

.w-icon-trash::before {
  content: "\eb07";
}

.w-icon-trash-fill::before {
  content: "\eb08";
}

.w-icon-tunnel-fill::before {
  content: "\eb09";
}

.w-icon-turn-left::before {
  content: "\eb0a";
}

.w-icon-turn-right::before {
  content: "\eb0b";
}

.w-icon-turn-sharp-left::before {
  content: "\eb0c";
}

.w-icon-turn-sharp-right::before {
  content: "\eb0d";
}

.w-icon-turn-slight-left::before {
  content: "\eb0e";
}

.w-icon-turn-slight-right::before {
  content: "\eb0f";
}

.w-icon-turn-straight::before {
  content: "\eb10";
}

.w-icon-turn-u-turn-left::before {
  content: "\eb11";
}

.w-icon-turn-u-turn-right::before {
  content: "\eb12";
}

.w-icon-undo::before {
  content: "\eb13";
}

.w-icon-university::before {
  content: "\eb14";
}

.w-icon-unpaved::before {
  content: "\eb15";
}

.w-icon-unpaved-fill::before {
  content: "\eb16";
}

.w-icon-unpin::before {
  content: "\eb17";
}

.w-icon-user::before {
  content: "\eb18";
}

.w-icon-user-fill::before {
  content: "\eb19";
}

.w-icon-vector-arrow::before {
  content: "\eb1a";
}

.w-icon-vector-arrow-reverse::before {
  content: "\eb1b";
}

.w-icon-voice::before {
  content: "\eb1c";
}

.w-icon-voice-fill::before {
  content: "\eb1d";
}

.w-icon-walk::before {
  content: "\eb1e";
}

.w-icon-warning::before {
  content: "\eb1f";
}

.w-icon-wazer::before {
  content: "\eb20";
}

.w-icon-wazer-fill::before {
  content: "\eb21";
}

.w-icon-wifi::before {
  content: "\eb22";
}

.w-icon-work::before {
  content: "\eb23";
}

.w-icon-x::before {
  content: "\eb24";
}

:host {
  /**
   * @prop --wz-autocomplete-item-image-size
   */
  --wz-menu-options-wrapper-padding: 8px 0;
  display: block;
}

.container {
  display: flex;
  flex-flow: column nowrap;
}
.container .status-text-container {
  display: flex;
  justify-content: flex-end;
}
.container .assistive-text {
  color: var(--content_p3, #72767d);
  flex: 1;
  font-size: 12px;
  margin-top: var(--wz-label-margin, 8px);
  padding: 0 16px;
}

.input-with-chips-area-container {
  background-color: var(--background_variant, #f2f4f7);
  border-color: var(--background_variant, #f2f4f7);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.input-with-chips-area-container .input-with-chips-area-container-left-flex {
  align-content: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow: hidden;
}
.input-with-chips-area-container .input-with-chips-area-container-left-flex .input-text-area {
  --primary: var(--background_variant, #f2f4f7);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.input-with-chips-area-container .input-with-chips-area-container-left-flex .input-text-area .autocomplete-hidden-input {
  font-family: var(--wz-font-family, Rubik, sans-serif);
}
.input-with-chips-area-container .input-with-chips-area-container-left-flex .input-text-area .autocomplete-hidden-input :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.input-with-chips-area-container .input-with-chips-area-container-left-flex .input-text-area .autocomplete-hidden-input :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.input-with-chips-area-container .input-with-chips-area-container-left-flex .input-text-area .autocomplete-hidden-input {
  align-items: flex-start;
  display: flex;
  font-size: 16px;
  height: 0;
  margin-left: 8px;
  visibility: hidden;
  white-space: pre;
}
.input-with-chips-area-container .input-area-container-right-flex {
  align-content: flex-start;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.input-with-chips-area-container .input-area-container-right-flex .remove-all-chips-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.action-symbol-container {
  align-items: center;
  align-self: flex-end;
  display: flex;
  height: 100%;
  margin-right: 8px;
}
.action-symbol-container .action-symbol {
  fill: var(--content_p2, #55595e);
  flex-shrink: 0;
  height: 24px;
  transition: transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
  user-select: none;
  width: 24px;
}
.action-symbol-container .action-symbol.rotated {
  transform: rotate(180deg);
}
.action-symbol-container .action-symbol.clear-icon {
  transition: none;
}

.menu {
  --wz-menu-max-width: 100%;
  width: 100%;
}
.menu.has-error {
  position: relative;
  top: -20px;
}
.menu.hidden {
  display: none;
}

.single-row-option,
.multi-row-option {
  line-height: normal;
}

.simple-item {
  --wz-menu-option-height: 40px;
}

.complex-item {
  --wz-menu-option-height: 60px;
}

.simple-sub-menu-item {
  --wz-menu-option-height: 40px;
}

.complex-item .wz-autocomplete-item {
  height: 60px;
}

.simple-item .wz-autocomplete-item {
  height: 40px;
}

.wz-autocomplete-item-alerts {
  height: 20px;
  position: relative;
  width: 20px;
}
.wz-autocomplete-item-alerts i {
  color: var(--leading_icon);
  font-size: 20px;
}
.wz-autocomplete-item-alerts .wz-autocomplete-item-tooltip-target {
  left: 50%;
  position: absolute;
  top: calc(50% - 6px);
}

.wz-autocomplete-item {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.wz-autocomplete-item.disabled,
.autocomplete-sub-menu.disabled {
  color: var(--disabled_text, #b7babf);
}
.wz-autocomplete-item:not(.disabled),
.autocomplete-sub-menu:not(.disabled) {
  color: var(--content_default, #202124);
}
.wz-autocomplete-item .wz-autocomplete-item-data,
.autocomplete-sub-menu .wz-autocomplete-item-data {
  align-items: center;
  display: flex;
  margin-right: 5px;
  overflow: hidden;
}
.wz-autocomplete-item .wz-autocomplete-item-image-container,
.autocomplete-sub-menu .wz-autocomplete-item-image-container {
  display: flex;
  margin-right: 5px;
  outline: transparent;
}
.wz-autocomplete-item img,
.autocomplete-sub-menu img {
  height: var(--wz-autocomplete-item-image-size, 40px);
  width: var(--wz-autocomplete-item-image-size, 40px);
}
.wz-autocomplete-item .primary-text,
.autocomplete-sub-menu .primary-text {
  font-size: 14px;
  white-space: nowrap;
}
.wz-autocomplete-item .secondary-text,
.autocomplete-sub-menu .secondary-text {
  font-size: 12px;
  white-space: nowrap;
}
.wz-autocomplete-item .autocomplete-matched-text,
.autocomplete-sub-menu .autocomplete-matched-text {
  display: inline;
}
.wz-autocomplete-item .autocomplete-matched-text.disabled,
.autocomplete-sub-menu .autocomplete-matched-text.disabled {
  color: var(--disabled_text, #b7babf);
}
.wz-autocomplete-item .autocomplete-matched-text:not(.disabled),
.autocomplete-sub-menu .autocomplete-matched-text:not(.disabled) {
  color: var(--content_default, #202124);
}
.wz-autocomplete-item .autocomplete-unmatched-text,
.autocomplete-sub-menu .autocomplete-unmatched-text {
  display: inline;
}
.wz-autocomplete-item .autocomplete-unmatched-text.disabled,
.autocomplete-sub-menu .autocomplete-unmatched-text.disabled {
  color: var(--disabled_text, #b7babf);
}
.wz-autocomplete-item .autocomplete-unmatched-text:not(.disabled),
.autocomplete-sub-menu .autocomplete-unmatched-text:not(.disabled) {
  color: var(--content_default, #202124);
}
.wz-autocomplete-item .wz-string-wrapper,
.autocomplete-sub-menu .wz-string-wrapper {
  overflow: hidden;
  text-overflow: ellipsis;
}
.wz-autocomplete-item wz-menu[dir=ltr] .wz-string-wrapper,
.autocomplete-sub-menu wz-menu[dir=ltr] .wz-string-wrapper {
  display: flex;
  flex-direction: row;
}
.wz-autocomplete-item wz-menu[dir=rtl] .wz-string-wrapper,
.autocomplete-sub-menu wz-menu[dir=rtl] .wz-string-wrapper {
  display: flex;
  flex-direction: row-reverse;
}
```
