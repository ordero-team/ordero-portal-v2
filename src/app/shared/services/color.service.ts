import { Injectable } from '@angular/core';

export interface IStateStyle {
  color: string;
  background: string;
  border?: string;
}

/**
 * Sometimes we want to use our theme colors at component level without having to create new
 * style on the css. This service will provide the colors such instance's state color.
 */

@Injectable({ providedIn: 'root' })
export class ColorService {
  colors: any = {
    maroon: '#800000',
    dark_red: '#8b0000',
    brown: '#a52a2a',
    firebrick: '#b22222',
    crimson: '#dc143c',
    red: '#f00',
    tomato: '#ff6347',
    coral: '#ff7f50',
    indian_red: '#cd5c5c',
    light_coral: '#f08080',
    dark_salmon: '#e9967a',
    salmon: '#fa8072',
    light_salmon: '#ffa07a',
    orange_red: '#ff4500',
    dark_orange: '#ff8c00',
    orange: '#ffa500',
    gold: '#ffd700',
    dark_golden_rod: '#b8860b',
    golden_rod: '#daa520',
    pale_golden_rod: '#eee8aa',
    dark_khaki: '#bdb76b',
    khaki: '#f0e68c',
    olive: '#808000',
    yellow: '#ff0',
    yellow_green: '#9acd32',
    dark_olive_green: '#556b2f',
    olive_drab: '#6b8e23',
    lawn_green: '#7cfc00',
    chart_reuse: '#7fff00',
    green_yellow: '#adff2f',
    dark_green: '#006400',
    green: '#008000',
    forest_green: '#228b22',
    lime: '#0f0',
    lime_green: '#32cd32',
    light_green: '#90ee90',
    pale_green: '#98fb98',
    dark_sea_green: '#8fbc8f',
    medium_spring_green: '#00fa9a',
    spring_green: '#00ff7f',
    sea_green: '#2e8b57',
    medium_aqua_marine: '#66cdaa',
    medium_sea_green: '#3cb371',
    light_sea_green: '#20b2aa',
    dark_slate_gray: '#2f4f4f',
    teal: '#008080',
    dark_cyan: '#008b8b',
    aqua: '#0ff',
    light_cyan: '#e0ffff',
    dark_turquoise: '#00ced1',
    turquoise: '#40e0d0',
    medium_turquoise: '#48d1cc',
    pale_turquoise: '#afeeee',
    aqua_marine: '#7fffd4',
    powder_blue: '#b0e0e6',
    cadet_blue: '#5f9ea0',
    steel_blue: '#4682b4',
    corn_flower_blue: '#6495ed',
    deep_sky_blue: '#00bfff',
    dodger_blue: '#1e90ff',
    light_blue: '#add8e6',
    sky_blue: '#87ceeb',
    light_sky_blue: '#87cefa',
    midnight_blue: '#191970',
    navy: '#000080',
    dark_blue: '#00008b',
    medium_blue: '#0000cd',
    blue: '#00f',
    royal_blue: '#4169e1',
    blue_violet: '#8a2be2',
    indigo: '#4b0082',
    dark_slate_blue: '#483d8b',
    slate_blue: '#6a5acd',
    medium_slate_blue: '#7b68ee',
    medium_purple: '#9370db',
    dark_magenta: '#8b008b',
    dark_violet: '#9400d3',
    dark_orchid: '#9932cc',
    medium_orchid: '#ba55d3',
    purple: '#800080',
    thistle: '#d8bfd8',
    plum: '#dda0dd',
    violet: '#ee82ee',
    magenta: '#f0f',
    orchid: '#da70d6',
    medium_violet_red: '#c71585',
    pale_violet_red: '#db7093',
    deep_pink: '#ff1493',
    hot_pink: '#ff69b4',
    light_pink: '#ffb6c1',
    pink: '#ffc0cb',
    antique_white: '#faebd7',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    blanched_almond: '#ffebcd',
    wheat: '#f5deb3',
    corn_silk: '#fff8dc',
    lemon_chiffon: '#fffacd',
    light_golden: '#fafad2',
    light_yellow: '#ffffe0',
    saddle_brown: '#8b4513',
    sienna: '#a0522d',
    chocolate: '#d2691e',
    peru: '#cd853f',
    sandy_brown: '#f4a460',
    burly_wood: '#deb887',
    tan: '#d2b48c',
    rosy_brown: '#bc8f8f',
    moccasin: '#ffe4b5',
    navajo_white: '#ffdead',
    peach_puff: '#ffdab9',
    misty_rose: '#ffe4e1',
    lavender_blush: '#fff0f5',
    linen: '#faf0e6',
    old_lace: '#fdf5e6',
    papaya_whip: '#ffefd5',
    sea_shell: '#fff5ee',
    mint_cream: '#f5fffa',
    slate_gray: '#b3c0de',
    light_slate_gray: '#899bac',
    light_steel_blue: '#b0c4de',
    lavender: '#e6e6fa',
    floral_white: '#fffaf0',
    alice_blue: '#f0f8ff',
    ghost_white: '#f8f8ff',
    honeydew: '#f0fff0',
    ivory: '#fffff0',
    azure: '#f0ffff',
    snow: '#fffafa',
    black: '#000',
    dim_grey: '#696969',
    grey: '#808080',
    dark_grey: '#a9a9a9',
    silver: '#c0c0c0',
    light_grey: '#d3d3d3',
    gainsboro: '#dcdcdc',
    white_smoke: '#f5f5f5',
    white: '#fff',

    // Marketplaces
    tokopedia: '#42b549',
    shopee: '#ee4d30',
    bukalapak: '#e3014d',
    lazada: '#000083',
    shopify: '#5e8e3e',
    jubelio: '#123a52',
    tiktok: '#000000',
    blibli: '#0eb3ff',
    offline: '#a9a9a9',
  };

  states: any = {
    // OTB
    pending: this.colors.grey,
    cancelled: this.colors.light_grey,
    checking: this.colors.corn_flower_blue,
    confirming: this.colors.deep_sky_blue,
    on_hold: this.colors.brown,
    receiving: this.colors.dodger_blue,
    picking: this.colors.sky_blue,
    picked: this.colors.lime_green,
    packing: this.colors.blue_violet,
    packed: this.colors.lime_green,
    completed: this.colors.lime_green,
    partially_packed: this.colors.dark_slate_blue,

    // PICKING
    multi_item: this.colors.slate_gray,
    single_item: this.colors.light_slate_gray,
    single_outbound: this.colors.lavender,
    wholesale_item: this.colors.powder_blue,

    // PACKAGE
    no_shipment: this.colors.grey,
    ready_to_ship: this.colors.burly_wood,
    awaiting_pickup: this.colors.rosy_brown,
    partially_shipped: this.colors.sandy_brown,
    shipped: this.colors.lime_green,
    delivered: this.colors.sea_green,
    // processing: this.colors.royal_blue,
    canceled: this.colors.light_grey,

    // BIN
    no_rack: this.colors.grey,
    on_receive: this.colors.dodger_blue,
    on_rack: this.colors.light_green,
    need_rack: this.colors.brown,
    on_pick: this.colors.sky_blue,
    to_pack: this.colors.plum,
    on_pack: this.colors.magenta,

    // MARKETPLACES
    tokopedia: this.colors.tokopedia,
    shopee: this.colors.shopee,
    bukalapak: this.colors.bukalapak,
    lazada: this.colors.lazada,
    shopify: this.colors.shopify,
    jubelio: this.colors.jubelio,
    tiktok: this.colors.tiktok,
    blibli: this.colors.blibli,
    offline: this.colors.offline,

    // RACK
    display_stock: this.colors.royal_blue,
    over_stock: this.colors.coral,

    // STOCK ADJUSTMENT
    draft: this.colors.grey,
    zero_stock: this.colors.corn_flower_blue,
    non_zero_stock: this.colors.coral,

    // MANIFEST
    ready: this.colors.corn_flower_blue,
    handed_over: this.colors.lime_green,
    courier: this.colors.dodger_blue,
    warehouse: this.colors.light_grey,

    // PLANS
    percentage: this.colors.corn_flower_blue,
    volume: this.colors.coral,

    // ORDER
    new_order: this.colors.slate_gray,
    return: this.colors.crimson,
    paid: this.colors.sea_green,
    ready_to_process: this.colors.corn_flower_blue,
    processing: this.colors.dodger_blue,
    processed: this.colors.medium_blue,
    to_confirm_receive: this.colors.deep_sky_blue,
    shipped_back: this.colors.rosy_brown,
    shipped_back_success: this.colors.sandy_brown,
    seller_accept: this.colors.cadet_blue,
    waiting_for_pickup: this.colors.moccasin,
    no_outbound: this.colors.grey,
    finished: this.colors.lime_green,
    rejected_by_seller: this.colors.red,
    awaiting_collection: this.colors.deep_sky_blue,
    in_transit: this.colors.sandy_brown,
    pesanan_telah_terkirim: this.colors.lime_green,
    menunggu_pengambilan_kuri: this.colors.moccasin,
    pesanan_sedang_diproses: this.colors.dodger_blue,

    // GENERAL
    active: this.colors.lime_green,
    inactive: this.colors.corn_flower_blue,
    blocked: this.colors.dim_grey,
    cod: this.colors.light_salmon,
    dropship: this.colors.medium_purple,
    verify_email: this.colors.sandy_brown,

    // TRACKING STRATEGY
    serial_number: this.colors.dark_violet,
    batch_number: this.colors.dark_blue,
    expiry_number: this.colors.dark_red,

    // REMOVAL STRATEGY
    fefo: this.colors.light_coral,
    lefo: this.colors.light_salmon,
    fifo: this.colors.light_blue,
    lifo: this.colors.light_pink,

    // STORAGE TYPE
    standard: this.colors.medium_sea_green,
    temperature_controlled: this.colors.medium_turquoise,

    // TRANSACTION TYPES
    inbound: this.colors.coral,
    outbound: this.colors.dark_khaki,
    stock_adjustment: this.colors.dark_green,
    pick: this.colors.sky_blue,
    pack: this.colors.blue_violet,
    shipment: this.colors.lime_green,
    manifest: this.colors.royal_blue,

    // CYCLE COUNT TYPES
    counting: this.colors.dodger_blue,
    in_review: this.colors.deep_sky_blue,
    recount: this.colors.steel_blue,
    adjusted: this.colors.lime_green,

    // COMPANIES
    no_plan: this.colors.orange,
    overdue: this.colors.crimson,
  };

  labels: any = {
    yes: 'Yes',
    no: 'No',
  };

  styles: any = {};

  constructor() {
    for (const state of Object.keys(this.states)) {
      this.styles[state] = this.styleOf(state);
    }
  }

  /**
   * Get the color value based on state name.
   * @param state
   *
   * @example
   *
   * <script>
   *   class XComponent {
   *     get background() {
   *       return this.color.colorOf('gateway_rejected'); // Return: '#d32f2f'
   *     }
   *
   *     constructor(private color: ColorService) {}
   *   }
   * </script>
   *
   */
  colorOf(state: string) {
    return this.states[state];
  }

  /**
   * Get a style object based on state name. The return value will be `{ color, background }`, and color
   * value will be automatically contrast to the background.
   * @param state
   *
   * @example
   *
   * <script>
   *   class XComponent {
   *     get styles() {
   *       return this.color.styleOf('provisioning');
   *     }
   *
   *     constructor(private color: ColorService) {}
   *   }
   * </script>
   *
   */
  styleOf(state: string): IStateStyle {
    const color = this.colorOf(state);
    return color
      ? {
          color: contrast(color),
          background: color,
        }
      : {
          color: contrast('#f4f4f4'),
          background: '#f4f4f4',
        };
  }
}

/**
 * Create a contrast color of the given color.
 * @param hex
 *
 * @example
 *
 * <script>
 *   const foreground = contrast('#ffffff'); // #000000
 * </script>
 */
export function contrast(hex: string) {
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  const r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);

  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000' : '#fff';
}
