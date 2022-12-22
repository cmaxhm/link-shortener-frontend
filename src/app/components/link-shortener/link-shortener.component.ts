import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../environments/environment.dev";
import { ResponseLink } from "../../interfaces/link.interface";
import { LinkShortenerService } from "../../services/link-shortener.service";

@Component({
  selector: 'app-link-shortener',
  templateUrl: './link-shortener.component.html',
  styleUrls: ['./link-shortener.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LinkShortenerComponent {
  @ViewChild('linkInput') linkInput!: ElementRef;
  public form: FormGroup;
  public isSent: boolean;
  public linkShortened: string;

  constructor(
    private formBuilder: FormBuilder,
    private linkShortenerService: LinkShortenerService
  ) {
    this.isSent = false;
    this.linkShortened = '';
    this.form = this.formBuilder.group({
      link: [
        '',
        [
          Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
          Validators.required
        ]
      ]
    });
  }

  private setSentFormStatus(): void {
    this.isSent = true;
  }

  private disableLinkInput(): void {
    this.linkInput.nativeElement.setAttribute('disabled', 'disabled');
  }

  private enableLinkInput(): void {
    this.linkInput.nativeElement.removeAttribute('disabled');
    this.isSent = false;
  }

  sendForm(): void {
    this.setSentFormStatus();
    const linkValue: string = this.form.value.link.trim();
    this.form.reset({ link: linkValue });

    if (this.form.valid) {
      this.disableLinkInput();

      this.linkShortenerService
        .shortenLink(linkValue)
        .subscribe((link: ResponseLink) => {
          this.linkShortened = `${environment.apiUrl}/${link.shortUrlId}`;
          this.enableLinkInput();
        });
    }
  }

  copyShortenedLink(): void {
    window.navigator.clipboard.writeText(this.linkShortened).then(() => {});
  }
}
