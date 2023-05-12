import { AfterViewInit, Directive, Host, Input, Optional } from '@angular/core';
import { NgForm, ValidatorFn } from '@angular/forms';
import { FormRecord, isBase64, ucFirst, VALIDATION_MESSAGES, Validators } from '@lib/form';

interface IValidator {
  messages: { [field: string]: string };
  validators: ValidatorFn[];
}

@Directive({ selector: '[akaForm]' })
export class FormDirective implements AfterViewInit {
  @Input() akaForm: FormRecord;

  public validators: { [field: string]: IValidator } = {};

  constructor(@Host() @Optional() public ngForm: NgForm) {}

  ngAfterViewInit(): void {
    // assign ngForm to akaForm
    this.akaForm.$form = this.ngForm;

    for (const [field, rule] of Object.entries(this.akaForm.$rules)) {
      this.validators[field] = this.buildValidators(field, rule as string);
    }
  }

  private buildValidators(name: string, rules: string) {
    const validators: ValidatorFn[] = [];
    const messages = {};

    rules = rules.replace(/pattern:(\/.+\/)(\|?)/, (a, b, c) => {
      return 'pattern:' + btoa(b) + c;
    });

    rules.split('|').forEach((rule) => {
      if (rule) {
        const rule_splited = rule.split(':');
        let rule_name = rule_splited[0];

        let rule_vars = [];
        if (rule_splited[1]) {
          rule_vars = rule_splited[1].split(',');
        }

        if (!Validators[rule_name]) {
          throw new TypeError('Validation rule [' + rule_name + '] does not exists.');
        }

        if (rule_vars.length > 1) {
          validators.push(Validators[rule_name](rule_vars));
        } else if (rule_vars.length === 1) {
          if (rule_name === 'pattern' && isBase64(rule_vars[0])) {
            rule_vars[0] = atob(rule_vars[0]).slice(1, -1);
          }

          validators.push(Validators[rule_name](rule_vars[0]));
        } else {
          validators.push(Validators[rule_name]);
        }

        // use required message for any kind of rules below
        if (['requiredTrue'].includes(rule_name)) {
          rule_name = 'required';
        }

        messages[rule_name.toLowerCase()] = this.buildMessage(name, rule_name, rule_vars);
      }
    });

    return { validators, messages };
  }

  private buildMessage(name, rule, arg = []) {
    if (!this.getMessage(rule)) {
      throw Error('Validation message is missing for: ' + rule);
    }

    let message = this.getMessage(rule);
    message = message.replace(/%n/g, ucFirst(name).replace(/\./g, ' ')).replace(/_/g, ' ');

    if (arg.length) {
      arg.forEach((val, key) => {
        message = message.replace('%' + key, val);
      });
    }

    return message;
  }

  private getMessage(rule) {
    return VALIDATION_MESSAGES[rule.toLowerCase()];
  }
}
