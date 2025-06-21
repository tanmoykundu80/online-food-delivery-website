import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  onSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const contact = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      location: formData.get('location'),
      message: formData.get('message')
    };

    console.log('Form Submitted:', contact);
    alert('Message sent successfully!');
    form.reset();
  }
}
