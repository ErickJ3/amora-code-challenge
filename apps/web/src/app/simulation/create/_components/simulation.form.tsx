import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { CurrencyInput } from '~/components/currency-input'
import { PercentageInput } from '~/components/percentage-input'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { UseFormReturn } from 'react-hook-form'
import { SimulationForm } from '~/lib/simulation'
import { NumericFormat } from 'react-number-format'

const INPUT_CLASSES = 'rounded-[10px] shadow-none focus-visible:ring-0 h-10'

interface SimulationFormProps {
  form: UseFormReturn<SimulationForm>
  onSubmit: (data: SimulationForm) => Promise<void>
  isLoading: boolean
}

export function SimulationFormComponent({
  form,
  onSubmit,
}: SimulationFormProps) {
  return (
    <Card className="border border-gray-200 shadow-none rounded-[12px]">
      <CardHeader>
        <CardTitle>Dados da Simulação</CardTitle>
        <CardDescription>Preencha para calcular sua simulação</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Simulação</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Apartamento Vila Madalena"
                      className={INPUT_CLASSES}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="propertyValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor do Imóvel</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="800.000,00"
                        className={INPUT_CLASSES}
                      />
                    </FormControl>
                    <FormDescription>
                      Valor total do imóvel em reais
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="downPaymentPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entrada</FormLabel>
                    <FormControl>
                      <PercentageInput
                        className={INPUT_CLASSES}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="20%"
                        min={0}
                        max={100}
                      />
                    </FormControl>
                    <FormDescription>
                      Percentual de entrada (padrão: 20%)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contractYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prazo</FormLabel>
                    <FormControl>
                      <NumericFormat
                        className={INPUT_CLASSES}
                        value={field.value}
                        onValueChange={(values) =>
                          field.onChange(values.floatValue)
                        }
                        placeholder="30"
                        suffix=" anos"
                        allowNegative={false}
                        decimalScale={0}
                        customInput={Input}
                      />
                    </FormControl>
                    <FormDescription>
                      Prazo do financiamento (padrão: 30 anos)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="annualInterestRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taxa de Juros</FormLabel>
                    <FormControl>
                      <NumericFormat
                        className={INPUT_CLASSES}
                        value={field.value}
                        onValueChange={(values) =>
                          field.onChange(values.floatValue)
                        }
                        placeholder="10,5"
                        suffix="% a.a."
                        allowNegative={false}
                        decimalSeparator=","
                        decimalScale={2}
                        customInput={Input}
                      />
                    </FormControl>
                    <FormDescription>
                      Taxa anual de juros (padrão: 10,5%)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Informações de Renda (Opcional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="monthlyGrossIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Renda Mensal Bruta</FormLabel>
                      <FormControl>
                        <CurrencyInput
                          className={INPUT_CLASSES}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="15.000,00"
                        />
                      </FormControl>
                      <FormDescription>Sua renda mensal total</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="monthlyExpenses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gastos Mensais</FormLabel>
                      <FormControl>
                        <CurrencyInput
                          className={INPUT_CLASSES}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="5.000,00"
                        />
                      </FormControl>
                      <FormDescription>
                        Seus gastos fixos mensais
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-[10px] bg-[#00144b] hover:bg-[#2c4a9b] cursor-pointer h-10"
              size="lg"
            >
              Guardar Simulação
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
