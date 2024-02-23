import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { AuthService } from '../../../../../auth/services/auth.service';
import { URL_PATTERN } from '../../../../../shared/utilities/constants.utility';
import { CreateLink } from '../../interfaces/create-link.interface';
import { LinksService } from '../../services/links.service';

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.scss']
})
export class CreateLinkComponent {
  /**
   * Event emitted when a link is created.
   */
  @Output() public linkCreated: EventEmitter<void>;

  /**
   * The messages to show in the component.
   */
  public messages: Message[];

  /**
   *
   */
  public createLinkForm: FormGroup;

  constructor(
    private linksService: LinksService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.messages = [];
    this.linkCreated = new EventEmitter<void>();
    this.createLinkForm = this.formBuilder.group({
      link: ['', [Validators.required, Validators.pattern(URL_PATTERN)]]
    });
  }

  /**
   * Create a link.
   */
  public createLink(): void {
    const createLink: CreateLink = {
      userId: this.authService.getUserData()?.id!,
      url: this.createLinkForm.value.link.trim()
    };

    this.linksService.createLink(createLink).subscribe({
      next: () => {
        this.messages = [
          {
            severity: 'success',
            summary: 'Success',
            detail: 'Link created successfully.',
            life: 5000
          }
        ];
        this.linkCreated.emit();
      },
      error: () => {
        this.messages = [
          {
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred creating the link.',
            life: 5000
          }
        ];
      }
    });
  }
}
